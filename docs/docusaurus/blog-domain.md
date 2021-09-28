---
title: 博客功能记录
# id: docusaurus-blog
---

---

## 文章写法介绍 🚀

### 写文章

- 书写文章时，需要在 `blog` 目录中创建一个文件，文件名的格式为 `YYYY-MM-DD-my-blog-post-title.md`，文章的创建日期默认会从文件名中提取。

```html title="代码示例"
---
slug: 使用 Docusaurus 写博客
title: 使用 Docusaurus 写博客
author: 勺子
author_title: 前端(●—●) @ 无业游民
author_url: https://github.com/zhgt-shaozi/zhgt-shaozi.github.io
author_image_url: /static/img/logo.svg
tags: [Docusaurus2, Markdown]
---

文章主体内容....
```

### 部分属性介绍

```jsx title="部分常用属性"
⭐️ 'slug': 自定义文章路由 url

⭐️ 'title': 文章标题（会自动在侧边栏显示）

'hide_table_of_contents': bool 类型，是否隐藏文章的目录列表（一般展示在右侧），默认为 false

'image': 显示文章列表时所使用的封面或缩略图地址

'description': 文章的描述信息，主要用于搜索引擎搜索（SEO），若不设置，则使用文章正文内容的第一行代替

'draft': bool 类型，表明此文章正在写作中，在部署时不会被发布（但在开发环境中依然正常显示）

'date': 用于设置文章的创建时间，若不设置，默认为文件名中的时间

'author': 作者姓名

'author_title': 作者描述信息

'author_url': 作者个人地址（一般为 guthub 地址）

'author_image_url': 作者头像图片地址（网络或本地地址）

'tags': array 类型，文章的所属标签，会显示在文章下方
```

### 配置 blog

- `docusaurus.config.js` 文件中可以在 `presets 预设` 中对 blog 进行部分定制化的配置。

```jsx title="docusaurus.config.js 中 blog 的部分配置项"
module.exports = {
  // ...
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // ...
        blog: {
          ⭐️ /**
           * 是否显示阅读时长
           */
          showReadingTime: true,

          ⭐️ /**
           * 侧边栏博客列表的标题
           */
          blogSidebarTitle: '随笔 🎯',

          /**
           * 博客的标题（用于获得更好的 SEO 效果）
           */
          blogTitle: '...',

          /**
           * 博客的描述信息（用于获得更好的 SEO 效果）
           */
          blogDescription: '...',

          /**
           * 在线编辑的地址，不设置则不会显示下方的编辑按钮
           * 也可以是一个回调函数，用来定位当前 blog 的地址
           */
          editUrl: 'https://github.com/zhgt-shaozi/zhgt-shaozi.github.io/tree/main/blog',
          editUrl: ({ locale, blogDirPath, blogPath, permalink }) => {
            console.log(locale);  // 当前环境的语言包，默认英文（en）
            console.log(blogDirPath);  // 当前 blog 的父目录
            console.log(blogPath);  // 当前 blog 的目录，文件名
            console.log(permalink);  // 当前 blog 的 slug 属性
            return `https://github.com/zhgt-shaozi/zhgt-shaozi.github.io/tree/main/${blogDirPath}/${blogPath}` ;
          },

          /**
           * 侧边栏的博客列表中显示的 博客数量（number 类型）
           * 'ALL' - 全部显示（默认值）
           * 0 - 不显示侧边栏
           */
          blogSidebarCount: 'ALL',
        },
      },
    ],
  ],
};
```

<br />

## 相关链接 🚀

- [Markdown 基本使用 & 语法说明](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/markdown-basics)
- [Docusaurus 2 官方文档 - 博客功能](https://www.docusaurus.cn/docs/blog)
- [Docusaurus 2 官方文档 - 新增的 Markdown 功能](https://www.docusaurus.cn/docs/markdown-features)
