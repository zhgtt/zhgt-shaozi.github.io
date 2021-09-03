const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '勺子', // 网站标题（非 header 标题）
  tagline: '勇敢牛牛 不怕困难', // 网站副标题
  url: 'https://zhgt-shaozi.github.io', // 个人网站地址
  baseUrl: '/',
  onBrokenLinks: 'throw', // 当 docusaurus 检测到无效链接时的反应，throw - 抛错
  onBrokenMarkdownLinks: 'warn', // 当 docusaurus 检测到无效的 markdown warn - 提醒
  favicon: 'img/favicon.ico', // 网站图表 logo（可直接引用 static 静态目录下的文件）
  organizationName: 'zhgt-shaozi', // 拥有此源码仓库的 GitHub 用户或组织，部署命令（deployment command）会用到此参数。
  projectName: 'zhgt-shaozi.github.io', // GitHub 源码仓库的名称。部署命令（deployment command）会用到此参数。
  // 网站主题设置
  themeConfig: {
    hideableSidebar: true, // 是否显示侧边栏收起功能
    // 主题颜色模块设置
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false, // 是否隐藏主题切换 switch
      respectPrefersColorScheme: true,
      // 主题切换 switch 组件自定义设置
      switchConfig: {
        //   darkIcon: '🌙', // 暗色图标
        //   lightIcon: '\u2600', // 亮色图标
        //   // 暗色图标 style
        //   darkIconStyle: {
        //     marginLeft: '2px',
        //   },
        //   // 亮色图标 style
        //   lightIconStyle: {},
      },
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
          type: 'doc', // 菜单类型，doc - markdown 文档
          docId: 'hello', // 点击菜单跳转的文档页面，docId 和 type 配合使用
          position: 'right', // 菜单在导航栏的位置
          label: '前端学习', // 菜单标题
          // to: 'docs/hello',  // 点击菜单跳转的路径
        },
        {
          label: '笔记',
          position: 'right',
          // 存放子菜单
          items: [
            { label: '前端学习', to: 'docs/hello' },
            { label: '前端面试', to: 'docs/hello' },
          ],
        },
        { label: '博客', position: 'right', to: '/blog' },
        {
          href: 'https://github.com/zhgt-shaozi/zhgt-shaozi.github.io', // 外链，自带分享图标
          label: 'GitHub',
          position: 'right',
          // 在 custom.css 中自定义类名，可以去掉 label，改成图标，或者自定义样式
          // className: 'header-github-link',
        },
      ],
    },
    // 底部内容
    // footer: {
    //   // 底部主题，dark - 暗色主题，light - 亮色主题
    //   style: 'dark',
    //   // 底部内容链接（可分多列）
    //   links: [
    //     {
    //       title: 'More', // 主标题
    //       items: [
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   // 版权说明内容
    //   copyright: `Copyright © ${new Date().getFullYear()} 个人网站.`,
    // },
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
          // blogTitle: '', // blog 标题
          // logDescription: '', // blog 描述
          blogSidebarTitle: '随笔 🎯', // blog 侧边栏标题
        },
        // 主题
        theme: {
          // 全局样式文件
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      },
    ],
  ],
  // 插件
  plugins: [
    // sass 插件
    'docusaurus-plugin-sass',
  ],
  // 主题
  themes: [],
  // 需要加载的 CSS 线上资源地址，最终都会生成 link 标签
  stylesheets: [],
};
