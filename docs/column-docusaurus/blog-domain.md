---
title: 博客功能记录
sidebar_position: 3
---

## 创建文章 🐤

- 创建博客文章时，需要在 `./blog` 目录中创建一个文件，文件名的格式为 `YYYY-MM-DD-my-blog-post-title.md`；
- 如果没有在文章中配置 `date` 属性，则该文章的创建日期默认会从文件名中提取；

```yml title="文章 markdown 示例"
---
slug: 通过 Docusaurus 创建博客
title: 通过 Docusaurus 创建博客
# TODO authors 属性改写成 list 的形式会报错，可能为新版本(2.0.0-beta.8) 的 bug，等待修复（2021-10-26 记录）
authors:
  - name: 勺子
  - title: 前端(●—●) @ 无业游民
  - url: https://github.com/zhgt-shaozi/zhgt-shaozi.github.io
  - image_url: /static/img/...
tags: [Docusaurus, Markdown]
---
摘要内容...

<!-- truncate -->

文章主体内容....
```

## 博客功能 🐤

### 配置文章元数据

- Docusaurus 支持在博客文章中配置该文章的 **元数据信息**，包括 **标题**，**路由**，**日期** 等配置项；

```yml title="博客文章元数据介绍"
# ☘️ 自定义文章的路由 url
slug: /

# ☘️ 文章标题（会自动在侧边栏显示）
title: 标题

# 是否隐藏文章右侧的目录列表，boolean 类型，默认为 false
hide_table_of_contents: false

# 显示文章列表时所使用的封面或缩略图地址
image: /...

# ☘️ 文章的描述信息，用于填充 <head> 标签中的 <meta name="description" content="..."/> 和 <meta property="og:description" content="..."/>，供搜索引擎（SEO）索引，若不设置，则使用文章正文内容的第一行代替
description: 描述

# ☘️ 设置文章的关键字，用于填充 <head> 标签中的 <meta name="keywords" content="keywords1, keywords2, ..." />，供搜索引擎（SEO）索引
keywords: [key1, key2]
# 或
keywords:
  - key1
  - key2

# 表明此文章正在写作中，在部署时不会被发布（但在开发环境中依然正常显示），boolean 类型，默认为 false
draft: false

# 用于设置文章的创建时间，若不设置，默认为文件名中的时间
date: 2021-10-26

# ☘️ 作者信息，是一个 list / any[]；
authors:
  - name: 作者姓名
  - title: 作者描述信息
  - url: 作者个人地址（一般为 github 地址）
  - image_url: 作者头像图片地址（网络或本地地址）

# ❎ 作者姓名，将要废弃，推荐使用 authors
author: 作者姓名

# ❎ 作者描述信息，将要废弃，推荐使用 authors
author_title: 作者描述信息

# ❎ 作者个人地址，将要废弃，推荐使用 authors
author_url: https://...

# ❎ 作者头像地址，将要废弃，推荐使用 authors
author_image_url: /...

# ☘️ 文章的所属标签，会显示在文章下方
tags: [{ label: 标签名称, permalink: 标签固定的链接地址 }, ...]
# 或
tags:
  - tag1
  - tag2

# 右侧目录列表可显示的最小标题级别，默认是 2（h2 标题，范围只能是 h2-h6 之间）
toc_min_heading_level: 2

# 右侧目录列表可显示的最大标题级别，默认是 3（h3 标题，范围只能是 h2-h6 之间）
toc_max_heading_level: 3
```

### 截取摘要

- 可在文章 markdown 中使用 `<!--truncate-->` 来标记该文章的摘要，在 `<!--truncate-->` 标记上方的内容都将称为摘要；否则默认会将整篇文章作为摘要；
- 摘要内容会显示在 blog 文章列表中；

## blog 全局配置项 🐤

- 通过 `docusaurus.config.js` 文件中的 `presets（预设）` 对 `blog` 进行定制化的配置；

```jsx title="blog 的部分配置项"
module.exports = {
  // ...
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // ...
        blog: {
          // 博客文章在项目中的相对路径，默认为 'blog'
          path: 'blog',

          // ☘️ 配置博客列表页的路由地址，默认为 'blog'
          routeBasePath: 'blog',

          // ☘️ 是否在文章中显示阅读时长，默认为 true
          showReadingTime: true,

          // ☘️ 自定义侧边栏博客列表的标题
          blogSidebarTitle: '随笔 🎯',

          /**
           * 侧边栏博客列表中显示的 博客数量（number 类型）
           * 'ALL' - 全部显示（默认值）
           * 0 - 不显示侧边栏
           */
          blogSidebarCount: 'ALL',

          // 博客列表页中的文章个数，默认为 10
          postsPerPage: 10,

          // ☘️ 博客的标题（主要用于获得更好的 SEO 效果）
          blogTitle: '...',

          // ☘️ 博客的描述信息（主要用于获得更好的 SEO 效果）
          blogDescription: '...',

          // 定义博客页面的主题组件，一般不用配置（有需要自定义其他主题组件时可配置）
          blogListComponent: '@theme/BlogListPage', // 博客列表页面
          blogPostComponent: '@theme/BlogPostPage', // 博客文章页面
          blogTagsListComponent: '@theme/BlogTagsListPage', // 博客标签列表页面
          blogTagsPostsComponent: '@theme/BlogTagsPostsPage', // 博客标签对应的内容页面

          /**
           * 配置在线编辑的地址，不设置则不会显示文章下方的编辑按钮
           * 可以是一个回调函数，用来定位当前文章的在线编辑地址
           */
          editUrl: 'https://github.com/zhgt-shaozi/zhgt-shaozi.github.io/tree/main/blog',
          editUrl: ({ locale, blogDirPath, blogPath, permalink }) => {
            console.log(locale); // 当前环境的语言包，默认英文（en）
            console.log(blogDirPath); // 当前文章的父目录
            console.log(blogPath); // 当前文章的目录，文件名
            console.log(permalink); // 当前文章的 slug 属性，路由地址
            return `https://github.com/zhgt-shaozi/zhgt-shaozi.github.io/tree/main/${blogDirPath}/${blogPath}`;
          },

          /**
           * 当 editUrl 为一个地址时，可开启该配置，会以当前文章的本地化文件为目标，自动寻找并定位当前文章的在线编辑地址，默认为 false
           * 当 editUrl 为一个函数时，该配置无效
           */
          editLocalizedFiles: false,

          /**
           * 自定义生成 RSS/Atom 信息流，如需禁止生成信息流，请将 feedOptions.type 设置为 null
           * 当 editUrl 为一个函数时，该配置无效
           */
          feedOptions: {
            type: 'all', // 必填，可选项有 'rss' | 'feed' | 'all'
            title: '勺子', // 标题，默认取 siteConfig.title
            description: '', // 描述，默认取 `${siteConfig.title} Blog`
            copyright: 'Copyright © ...', // 版权说明
            language: undefined, // 语言
          },

          // ☘ 存放辅助型插件，例如 npm & yarn 的辅助型插件
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],

          ...
        },
      },
    ],
  ],
};
```

## 自定义 blog 主题组件 🐤

- 当需要自定义或修改 blog 主题组件（页面）时，可在 `./src/theme` 目录中创建和 `@theme/...` 同名的主题组件，此时 **Docusaurus** 会优先识别并使用 `./src/theme` 下的主题组件；
- 主题组件的创建可参考 `@theme/...` 的源码，[点击此链接前往查看](https://gitee.com/zhgt__xu/docusaurus-code/tree/master/theme-classic/src/theme)；
- 与 blog 有关的主题组件如下：

```jsx
'@theme/BlogLayout' // 博客页面布局 组件
'@theme/BlogListPage' // 博客列表 页面
'@theme/BlogListPaginator'  // 博客列表分页器 组件
'@theme/BlogPostItem' // 博客列表中的 item 组件
'@theme/BlogPostPage' // 博客文章 页面
'@theme/BlogPostPaginator'  // 博客文章中的分页器 组件
'@theme/BlogPostAuthors'  // 博客文章中的作者信息 组件
'@theme/BlogTagsListPage' // 博客标签列表 页面
'@theme/BlogTagsPostsPage' // 博客标签对应的内容 页面
'@theme/BlogSidebar' // 博客侧边栏 组件

'@theme/BackToTopButton' // 平滑滚动到顶部 组件
...
```

## 相关链接 🔗

- [Docusaurus 官方文档 - 博客功能](https://www.docusaurus.cn/docs/blog)
- [Docusaurus 官方文档 - 📦 plugin-content-blog 插件](https://www.docusaurus.cn/docs/api/plugins/@docusaurus/plugin-content-blog)
