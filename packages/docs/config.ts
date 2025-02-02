import type { Config } from '@docusaurus/types'
import path from 'node:path'

const buildConfig = (): Config => {
  const title = 'Chronocat'
  const tagline = '小巧轻便的 Red 实现'

  // const logo = {
  //   alt: 'Koishi Logo',
  //   src: 'img/logo.svg',
  //   href: '/',
  // }

  return {
    title,
    tagline,

    url: 'https://chronocat.vercel.app',
    baseUrl: '/',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // favicon: 'img/favicon.ico',

    organizationName: 'chrononeko',
    projectName: 'chronocat',

    i18n: {
      defaultLocale: 'zh-Hans',
      locales: ['zh-Hans'],
    },

    presets: [
      [
        'classic',
        {
          docs: {
            routeBasePath: '/',
            sidebarPath: path.join(__dirname, 'sidebars.ts'),
            editUrl:
              'https://github.com/chrononeko/chronocat/tree/master/packages/docs',
          },
          blog: false,
          theme: {
            customCss: path.join(__dirname, 'src/css/custom.scss'),
          },
        },
      ],
    ],

    plugins: ['docusaurus-plugin-sass'],

    themes: [
      [
        require.resolve('@easyops-cn/docusaurus-search-local'),
        {
          hashed: true,
          language: ['en', 'zh'],
          docsRouteBasePath: '/',
        },
      ],
    ],

    themeConfig: {
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },

      // image: 'img/logo.png',

      metadata: [
        {
          name: 'description',
          content: tagline,
        },
        {
          name: 'keywords',
          content:
            'Chronocat, Red, Chrononeko, RedProtocol, BetterQQNT, LiteLoaderQQNT, QQNTim, NoneBot, NoneBot2, Koishi, Koishi.js, Bot, Chatbot, 机器人, OneBot, QQ',
        },
      ],

      navbar: {
        title,

        // logo,

        items: [
          {
            label: '安装',
            position: 'left',
            to: 'install',
          },
          {
            label: '接入',
            position: 'left',
            to: 'connect',
          },
          {
            label: '开发',
            position: 'left',
            type: 'dropdown',
            to: 'develop',
            items: [
              {
                label: '协议',
                to: 'develop/protocol',
              },
              {
                label: '原生',
                to: 'develop/native',
              },
              {
                label: 'JavaScript',
                to: 'develop/js',
              },
            ],
          },
          {
            label: '社区',
            position: 'left',
            to: 'community',
          },
          {
            href: 'https://github.com/chrononeko/chronocat',
            html: '<svg style="width:24px;height:24px;display:block" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>',
            position: 'right',
          },
        ],

        // hideOnScroll: true,
      },

      footer: {
        style: 'dark',

        // logo: {
        //   ...logo,
        //   width: 80,
        // },

        links: [
          {
            title: '使用',
            items: [
              {
                label: '安装',
                to: '/install',
              },
              {
                label: '接入',
                to: '/connect',
              },
            ],
          },
          {
            title: '开发',
            items: [
              {
                label: '协议',
                to: '/develop/protocol',
              },
              {
                label: '原生',
                to: '/develop/native',
              },
              {
                label: 'JavaScript SDK',
                to: '/develop/js',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '社区',
                to: '/community',
              },
              {
                label: '全站搜索',
                to: '/search',
              },
            ],
          },
        ],
        copyright: `<span>Copyright © ${new Date().getFullYear()} Team Chrononeko</span>`,
      },

      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },

      prism: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        theme: require('prism-react-renderer/themes/github'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        darkTheme: require('prism-react-renderer/themes/dracula'),
      },
    },
  }
}

export const config = buildConfig()
