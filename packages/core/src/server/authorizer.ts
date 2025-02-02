import type { MetaConnectPayload } from '@chronocat/red'
import type { IncomingMessage } from 'node:http'

export const HeaderAuthorizer = (token: string) => (req: IncomingMessage) =>
  req.headers.authorization?.slice(0, 7) === 'Bearer ' &&
  req.headers.authorization.slice(7) === token

export const PayloadAuthorizer = (token) => (payload) =>
  (payload as MetaConnectPayload).token === token
