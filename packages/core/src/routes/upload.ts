import busboy from 'busboy'
import { randomFillSync } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import {
  getFileMd5,
  getFileSize,
  getFileType,
  getImageSizeFromPath,
} from '../ipc/definitions/fsApi'
import { getRichMediaFilePath } from '../ipc/definitions/msgService'
import { router } from '../router'
import { baseDir } from '../utils/baseDir'

router.upload.$httpOnly('POST')(
  ({ http: { req, res } }) =>
    new Promise((resolve, reject) => {
      const bb = busboy({ headers: req.headers })

      let f:
        | Promise<{
            filePath: string
            fileInfo: busboy.FileInfo
          }>
        | undefined

      bb.on('error', reject)

      bb.on('file', (_name, file, info) => {
        f = (async () => {
          const saveTo = join(baseDir, `redprotocol-upload`)
          await mkdir(saveTo, { recursive: true })
          const filePath = join(
            saveTo,
            `${randomFillSync(Buffer.alloc(16)).toString('hex')}-${
              info.filename
            }`,
          )

          return await new Promise((resolve2, reject2) =>
            file
              .pipe(createWriteStream(filePath))
              .on('finish', () =>
                resolve2({
                  filePath,
                  fileInfo: info,
                }),
              )
              .on('error', reject2),
          )
        })()
      })

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      bb.on('close', async () => {
        if (!f) {
          res.writeHead(400)
          res.end('400 bad request')
          return
        }

        try {
          const { filePath, fileInfo } = await f

          let fileType: {
            mime: string
          } = await getFileType(filePath)

          if (!fileType?.mime)
            fileType = {
              mime: 'application/octet-stream',
            }

          const category = fileType.mime.split('/')[0]

          const [md5, imageInfo, fileSize] = await Promise.all([
            getFileMd5(filePath),
            category === 'image' ? getImageSizeFromPath(filePath) : undefined,
            getFileSize(filePath),
          ])

          const richMediaPath = await getRichMediaFilePath({
            md5HexStr: md5,
            fileName: fileInfo.filename,
            elementType: 2, // TODO: 根据 mime 决定，使文件能放入对应文件夹
            elementSubType: 0,
            thumbSize: 0,
            needCreate: true,
            fileType: 1,
          })

          await copyFile(filePath, richMediaPath as string)

          resolve({
            md5,
            imageInfo,
            fileSize,
            filePath,
            ntFilePath: richMediaPath,
          })
        } catch (e) {
          res.writeHead(500)
          res.end('500 internal server error')
        }
      })

      req.pipe(bb)
    }),
)
