// @ts-check
const path = require('path');

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: '勺子',
  tagline: '勇敢牛牛 不怕困难',
  // url: 'https://zhgt-shaozi.github.io', // 个人网站地址
  url: 'https://shaozi.vercel.app',
  baseUrl: '/',
  baseUrlIssueBanner: true,
  favicon: 'img/favicon.ico',
  organizationName: 'zhgt-shaozi',
  projectName: 'zhgt-shaozi.github.io',
  titleDelimiter: '🦖',
  // 预设 - 为插件/主题添加配置参数
  presets: [
    // 默认主题设置
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'), // 侧边栏路径
          remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
          // showLastUpdateAuthor: true,
          // showLastUpdateTime: true,
        },
        blog: {
          routeBasePath: 'blog',
          showReadingTime: true,
          // blogTitle: '', // blog 标题
          // logDescription: '', // blog 描述
          blogSidebarTitle: '随笔 🎯', // blog 侧边栏标题
          remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
        },
        // 主题
        theme: {
          // 全局样式文件
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      }),
    ],
  ],
  // 插件
  plugins: [
    // sass 插件
    'docusaurus-plugin-sass',
  ],
  // 主题
  themes: ['@docusaurus/theme-live-codeblock'],
  // 需要加载的 CSS 线上资源地址，最终都会生成 link 标签
  stylesheets: [],
  // 国际化
  i18n: {
    defaultLocale: 'zh-CN', // 默认语言
    locales: ['zh-CN', 'en'], // 本地语言包
  },
  // 网站主题 / 导航栏设置
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: true, // 是否显示侧边栏收起功能
      colorMode: {
        respectPrefersColorScheme: true,
      },
      // 公告条
      announcementBar: {
        id: 'support_us',
        content: '号外！号外！📢 📢 📢',
        isCloseable: false,
      },
      // 导航栏
      navbar: {
        hideOnScroll: true, // 是否文档向下滚动时收起导航栏
        title: '勺子', // 导航栏 title 和 logo
        logo: {
          alt: '勺子', // 图片的 alt
          src: 'img/logo.svg',
        },
        // 导航栏菜单内容
        items: [
          {
            label: '前端 Madao',
            position: 'right',
            // 子菜单
            items: [
              { label: '学习 😒', type: 'doc', docId: 'introduction' },
              // { label: '面试 📋', to: 'docs/interview' },
            ],
          },
          {
            label: '专栏',
            to: 'docs/column-docusaurus',
            position: 'right',
          },
          { label: '博客', position: 'right', to: '/blog' },
          {
            href: 'https://github.com/zhgt-shaozi/zhgt-shaozi.github.io', // 外链，自带分享图标
            label: 'GitHub',
            position: 'right',
            // 在 custom.css 中自定义类名，可以去掉 label，改成图标，或者自定义样式
            // className: 'header-github-link',
          },
          {
            position: 'right',
            type: 'search',
          },
        ],
      },
      // 底部内容
      footer: {
        logo: {
          alt: '勺子', // 图片的 alt
          src: 'img/logo.svg',
        },
        style: 'dark',
        links: [
          {
            title: 'Community', // 主标题
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/zhgt-shaozi/zhgt-shaozi.github.io',
              },
              {
                html: `<a href="https://www.bilibili.com/" target="_blank">bilibili 动画</a>`,
              },
            ],
          },
        ],
        // 版权说明内容
        copyright: `Copyright © ${new Date().getFullYear()} 个人网站.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/dracula'),
        defaultLanguage: 'javascript',
      },
    }),
};
