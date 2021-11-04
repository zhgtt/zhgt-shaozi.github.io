---
title: 博客功能记录
sidebar_position: 4
---

## 创建文章 🐸

- 创建博客文章时，需要在 `./blog` 目录中创建一个文件，文件名的格式为 `YYYY-MM-DD-my-blog-post-title.md`；
- 如果没有在文章的 **元数据** 中配置 `date` 属性，则该文章的创建日期默认会从文件名中提取；

```yml title="文章 markdown 示例"
---
slug: 通过 Docusaurus 创建博客
title: 通过 Docusaurus 创建博客
authors: [shaozi]
tags: [Docusaurus, Markdown]
---
摘要内容...

<!-- truncate -->

文章主体内容....
```

## 博客功能 🐸

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

# ☘️ 作者信息列表，当需要指定多个作者时，可使用该属性，是一个 any[] 类型，每个作者下都配有 name，title 等信息；
# 一般结合 /blog/authors.yml 或 /blog/authors.json 文件使用
authors:
  - 作者壹 id
  - 作者贰 id
  - name: 作者叁 姓名
    title: 作者描述信息
    url: 作者个人地址（一般为 github 地址）
    image_url: 作者头像图片地址（网络或本地地址）
    ...   # 还可配置额外的自定义信息
# 或
authors: [作者壹 id, 作者贰 id, { name: '作者叁の姓名', title: '作者叁の信息', url: '', image_url: '', ... }]

# ❎ 作者姓名，推荐使用 authors
author: 作者姓名

# ❎ 作者描述信息，推荐使用 authors
author_title: 作者描述信息

# ❎ 作者个人地址，推荐使用 authors
author_url: https://...

# ❎ 作者头像地址，推荐使用 authors
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

- 可在文章 markdown 中使用 `<!--truncate-->` 来标记该文章的摘要，在 `<!--truncate-->` 标记上方的内容都将成为摘要；否则默认会将整篇文章作为摘要；
- 摘要内容会显示在 blog 文章列表中；

### 配置多个作者信息

- 当需要在博客文章中配置多个作者时，需要在文章的元数据中配置 `authors` 属性；
- 还需在 `/blog` 根目录下创建 `authors.yml` 或 `authors.json` 文件，在该文件中配置作者列表信息，并且每个作者都有其对应的唯一 `id`，如下：

```yml title="authors.yml"
shaozi: # 作者对应的唯一 id
  name: 勺子
  title: 前端(●—●) @ 无业游民
  url: https://github.com/zhgt-shaozi/zhgt-shaozi.github.io
  image_url: /static/img/logo.svg

hyj:
  name: 郝脸脸
  title: 一个可爱的女孩儿 @ 🐷
  url: https://github.com/zhgt-shaozi/zhgt-shaozi.github.io
  image_url: /static/img/logo.svg
```

```yml title="blog.md 示例"
---
title: 博客标题
authors: [shaozi, hyj] # 根据作者 id 配置多个作者
tags: [example]
---
博客内容...
```

## blog 的全局配置项 🐸

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

          /**
           * ☘️ 指定博客列表页中的文章个数（number 类型），并进行分页显示，默认为 10
           * 'ALL' - 全部显示
           */
          postsPerPage: 10,

          // ☘️ 博客的标题（主要用于获得更好的 SEO 效果）
          blogTitle: '...',

          // ☘️ 博客的描述信息（主要用于获得更好的 SEO 效果）
          blogDescription: '...',

          // ☘️ 自定义侧边栏博客列表的标题
          blogSidebarTitle: '随笔 🎯',

          /**
           * ☘️ 侧边栏博客列表中显示的 博客数量（number 类型），默认为 5
           * 'ALL' - 全部显示
           * 0 - 不显示侧边栏
           */
          blogSidebarCount: 'ALL',

          // 定义博客页面的主题组件，一般不用配置（有需要自定义其他主题组件时可配置）
          blogListComponent: '@theme/BlogListPage', // 博客列表页面
          blogPostComponent: '@theme/BlogPostPage', // 博客文章页面
          blogTagsListComponent: '@theme/BlogTagsListPage', // 博客标签列表页面
          blogTagsPostsComponent: '@theme/BlogTagsPostsPage', // 博客标签对应的内容页面

          /**
           * 配置在线编辑的地址，不设置则不会显示文章下方的编辑按钮
           * 可以是一个回调函数（function），返回一个 string / undefined，用来定位当前文章的在线编辑地址
           */
          editUrl: 'https://github.com/zhgt-shaozi/zhgt-shaozi.github.io/tree/main/blog',
          editUrl: ({ locale, blogDirPath, blogPath, permalink }) => {
            console.log(locale); // 当前环境的语言包，默认英文（en）
            console.log(blogDirPath); // 每篇文章的根目录
            console.log(blogPath); // 每篇文章的目录，文件名
            console.log(permalink); // 每篇文章元数据的 slug 属性，路由地址
            return `https://github.com/zhgt-shaozi/zhgt-shaozi.github.io/tree/main/${blogDirPath}/${blogPath}`;
          },

          /**
           * 当 editUrl 为一个地址时，可开启该配置，会以当前文章的本地化文件为目标，自动寻找并定位当前文章的在线编辑地址，默认为 false
           * 当 editUrl 为一个函数时，该配置无效
           */
          editLocalizedFiles: false,

          // 自定义 tags 标签列表页的路由，默认为 'tags'，完整路由为：https://xxx/blog/tags
          tagsBasePath: 'tags',

          // 自定义 博客档案(能看到所有博客，以及博客的时间线) 页面的路由，默认为 'archive'，完整路由为：https://xxx/blog/archive
          archiveBasePath: 'archive'

          // 指定哪些 文件 能被匹配到（以下是默认值）
          include: ['**/*.{md,mdx}'],

          // 指定哪些 文件 不能被匹配到（以下是默认值）
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
          ],

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

          // ☘ remark 是 Markdown 的处理器，可提供一些插件来支持 Markdown，丰富 Markdown 的功能
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],

          // rehype 是将 Markdown 转换成 HTML 的处理器，可提供一些插件，更方便的进行转换
          rehypePlugins: [],

          // ☘ 指定 string / RegExp（正则） 来匹配对应的 摘要内容（以下是默认值）
          truncateMarker: /<!--\s*(truncate)\s*-->/,

          // ☘️ 是否在文章中显示阅读时长，默认为 true
          showReadingTime: true,

          // 自行处理 阅读时长 的数据，只能返回 number / undefined 类型
          readingTime: ({ content, frontMatter, defaultReadingTime }) => {
            console.log(content);   // 每篇博客的 完整内容
            console.log(frontMatter);   // 每篇博客的 元数据
            return defaultReadingTime({ content });   // 每篇博客的 阅读时长（number 类型，默认值）
          },

          /**
           * ☘️ 自定义 作者信息列表 目录的文件名，它默认存在于 /blog 根目录下（若没有该文件时，可自行创建）
           * 该文件可以为 '.yml' 或 '.json' 格式（以下是默认值）
           */
          authorsMapPath: 'authors.yml'

          ...
        },
      },
    ],
  ],
};
```

## 自定义 blog 主题组件 🐸

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
'@theme/BlogArchivePage' // 博客档案 页面

'@theme/BackToTopButton' // 平滑滚动到顶部 组件
...
```

## 相关链接 🔗

- [Docusaurus 官方文档 - 博客功能](https://www.docusaurus.cn/docs/blog)
- [Docusaurus 官方文档 - 📦 plugin-content-blog 插件](https://www.docusaurus.cn/docs/api/plugins/@docusaurus/plugin-content-blog)
