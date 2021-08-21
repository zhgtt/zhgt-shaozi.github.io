const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  // 网站标题（非 header 标题）
  title: '勺子',
  // 网站副标题
  tagline: '勇敢牛牛 不怕困难',
  // 个人网站地址
  url: 'https://zhgt-shaozi.github.io',
  baseUrl: '/',
  // 当 docusaurus 检测到无效链接时的反应，throw - 抛错
  onBrokenLinks: 'throw',
  // 当 docusaurus 检测到无效的 markdown warn - 提醒
  onBrokenMarkdownLinks: 'warn',
  // 网站图表 logo（可直接引用 static 静态目录下的文件）
  favicon: 'img/favicon.ico',
  // 拥有此源码仓库的 GitHub 用户或组织，部署命令（deployment command）会用到此参数。
  organizationName: 'zhgt-shaozi',
  // GitHub 源码仓库的名称。部署命令（deployment command）会用到此参数。
  projectName: 'zhgt-shaozi.github.io',
  // 网站主题设置
  themeConfig: {
    // 是否显示侧边栏收起功能
    hideableSidebar: true,
    // 主题颜色模块设置
    colorMode: {
      defaultMode: 'light',
      // 是否隐藏主题切换 switch
      disableSwitch: false,
      respectPrefersColorScheme: true,
      // 主题切换 switch 组件自定义设置
      // switchConfig: {
      //   // 暗色图标
      //   darkIcon: '🌙',
      //   // 亮色图标
      //   lightIcon: '\u2600',
      //   // 暗色图标 style
      //   darkIconStyle: {
      //     marginLeft: '2px',
      //   },
      //   // 亮色图标 style
      //   lightIconStyle: {},
      // },
    },
    // 导航栏
    navbar: {
      // 是否文档向下滚动时收起导航栏
      hideOnScroll: true,
      // 导航栏 title 和 logo
      title: '勺子',
      logo: {
        alt: '勺子', // 图片的 alt
        src: 'img/logo.svg',
      },
      // 导航栏菜单内容
      items: [
        // {
        //   // 菜单类型，doc - markdown 文档
        //   type: 'doc',
        //   // 点击菜单跳转的文档页面，docId 和 type 配合使用
        //   docId: 'hello',
        //   // 菜单在导航栏的位置
        //   position: 'right',
        //   // 菜单标题
        //   label: '前端学习',
        //   // 点击菜单跳转的路径
        //   // to: 'docs/hello',
        // },
        {
          label: '笔记',
          position: 'right',
          // 存放子菜单
          items: [
            {
              label: '前端学习',
              to: 'docs/hello',
            },
            {
              label: '前端面试',
              to: 'docs/hello',
            },
          ],
        },
        // {
        //   // 外链，自带分享图标
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        //   // 在 custom.css 中自定义类名，可以去掉 label，改成图标，或者自定义样式
        //   // className: 'header-github-link',
        // },
      ],
    },
    // 底部内容
    footer: {
      // 底部主题，dark - 暗色主题，light - 亮色主题
      style: 'dark',
      // 底部内容链接（可分多列）
      links: [
        {
          title: 'More', // 主标题
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
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
    },
  },
  // 预设 - 为插件/主题添加配置参数
  presets: [
    // 默认主题设置
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'), // 侧边栏路径
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'), // 默认样式文件
        },
      },
    ],
  ],
  // 插件
  plugins: [
    // sass 插件
    'docusaurus-plugin-sass',
  ],
};
