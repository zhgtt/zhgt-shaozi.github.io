---
title: Docusaurus 杂谈
sidebar_position: 6
---

> 本章节学习 Docusaurus 常用的全局 API & 搜索功能

## Docusaurus 常用的全局 API 🐸

### `Link` 组件

- 同 React 中的 **Link** 组件相似，用来进行链接跳转:

```jsx title="src/pages/index.tsx"
import React from 'react';
// highlight-next-line
import Link from '@docusaurus/Link';

const Homepage = () => {
  return (
    <>
      <Link to='/' className='link'>
        跳转至首页
      </Link>

      <Link href='https://www.bilibili.com/' style={{ color: 'green' }}>
        跳转至外部链接
      </Link>
    </>
  );
};
```

### `Translate` 组件

- Docusaurus 提供的 **翻译** 组件，它需指定一个唯一 `id`，用来在 **/i18n** 的 JSON 文件中匹配对应的语言字符;
- 此外还提供了一个 `translate` 函数，用在原生标签或组件的属性中，比如 `title`，`aria-label` 等;

```json title="i18n/en/code.json"
{
  "theme.homepage.title": "Welcome to my website! 👏🏻👏🏻👏🏻",
  "theme.homepage.content": "Hello! My name is {name}, I'm form {country}",
  "theme.homepage.button": {
    "message": "See More"
  }
}
```

```json title="i18n/zh-CN/code.json"
{
  "theme.homepage.title": "欢迎来到我的网页！👏🏻👏🏻👏🏻",
  "theme.homepage.content": "你好！我是来自 {country} 的 {name}",
  "theme.homepage.button": {
    "message": "查看更多"
  }
}
```

```jsx title="src/pages/index.tsx"
import React from 'react';
// highlight-next-line
import Translate, { translate } from '@docusaurus/Translate';

const Homepage = () => {
  return (
    <>
      {/* Translate 组件普通用法 */}
      <h2>
        <Translate
          id='theme.homepage.title' // 唯一 id
          description='The homepage welcome message' // 该翻译的描述信息（可选）
        >
          Welcome to my website
        </Translate>
      </h2>

      {/* Translate 组件（带插槽）用法 */}
      <h2>
        <Translate
          id='theme.homepage.content'
          values={{ name: <b>桒木</b>, country: '中国(🇨🇳)' }} // 指定多个插槽，内容可自定义，可直接显示在页面上
        >
          {"Hello! My name is {name}, I'm form {country}"}
        </Translate>
      </h2>

      {/* translate 函数用法 */}
      <button type='button' title={translate({ id: 'theme.homepage.button', message: 'See More' })}>
        查看更多
      </button>
    </>
  );
};
```

### `useDocusaurusContext` 函数

- 该函数是一个 **React Hooks 函数**，用来获取 **docusaurus.config.js** 中的 **配置项** 上下文对象，比如 标题，副标题 等:

```jsx title="src/pages/index.tsx"
import React from 'react';
// highlight-next-line
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Homepage = () => {
  // highlight-next-line
  const { siteConfig } = useDocusaurusContext(); // 获取全局配置项
  const { title, tagline } = siteConfig;

  return <h2>{`${title} · ${tagline}`}</h2>;
};
```

### `useBaseUrl` 函数

- 该函数是一个 **React Hooks 函数**，它基于 `siteConfig.baseUrl` 路径，是一个绝对路径，通常用于指定 **img** 的路径:

```jsx {2} title="src/pages/index.tsx"
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const Homepage = () => {
  return <img src={useBaseUrl('/img/...')} alt='Example Image' />;
};
```

:::info 离谱小贴士
📢 尽量不要将该函数用于常规的 **跳转链接** 中;
:::

### `useThemeConfig` 函数

- 该函数是一个 **React Hooks 函数**，用来获取 **docusaurus.config.js** 中 `themeConfig` 的所有配置项:

```jsx title="src/pages/index.tsx"
import React from 'react';
// highlight-next-line
import { useThemeConfig } from '@docusaurus/theme-common';

const Homepage = () => {
  // highlight-start
  const {
    navbar: { hideOnScroll },
    hideableSidebar,
  } = useThemeConfig();
  // highlight-end

  return (
    <>
      <h2>{hideOnScroll ? '页面滚动时-收起导航条' : '页面滚动时-显示导航条'}</h2>
      <h2>{hideableSidebar ? '侧边栏菜单-隐藏折叠按钮' : '侧边栏菜单-显示折叠按钮'}</h2>
    </>
  );
};
```

### `ThemeContext` 上下文

- **主题** 上下文对象，用来获取和 Docusaurus 主题相关的信息，需结合 `React.useContext` 函数使用:

```jsx title="src/pages/index.tsx"
import React from 'react';
// highlight-next-line
import ThemeContext from '@theme/ThemeContext';

const Homepage = () => {
  // highlight-next-line
  const { isDarkTheme } = React.useContext(ThemeContext); // 获取主题相关信息

  return <h2>{isDarkTheme ? '暗黑(夜间)主题' : '日间主题'}</h2>;
};
```

### `CodeBlock` 组件

- Docusaurus 提供的 **代码块** 组件;

```jsx title="src/pages/index.tsx"
import React from 'react';
// highlight-next-line
import CodeBlock from '@theme/CodeBlock';

const codeExample = `
import React from 'react'; 
  
const WelcomeScreen = () => (
    <h2>Welcome to my website</h2>
);
  `;

const Homepage = () => {
  return (
    <CodeBlock language='jsx' style={{ textAlign: 'left' }}>
      {codeExample}
    </CodeBlock>
  );
};
```

### `ThemedImage` 组件

- Ducusaurus 提供的 **主题图像** 组件，根据当前主题自动切换成对应的图像;

```jsx {3} title="src/pages/index.tsx"
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

const Homepage = () => {
  return (
    <ThemedImage
      alt='Docusaurus 主题图像'
      sources={{
        light: useBaseUrl('/img/**.svg'), // 亮色主题下对应的图像
        dark: useBaseUrl('/img/**.svg'), // 暗色主题下对应的图像
      }}
    />
  );
};
```

### `useWindowSize` 函数

- 该函数是一个 **React Hooks 函数**，用来获取 **浏览器窗口的视图状态**;

```jsx title="src/pages/index.tsx"
import React from 'react';
// highlight-next-line
import useWindowSize from '@theme/hooks/useWindowSize';

const Homepage = () => {
  // highlight-start
  const windowSize = useWindowSize();
  const shouldRenderSidebarDesktop = windowSize === 'desktop' || windowSize === 'ssr'; // 桌面窗口状态
  const shouldRenderSidebarMobile = windowSize === 'mobile'; // 手机窗口状态
  // highlight-end

  return (
    <>
      {shouldRenderSidebarDesktop && '桌面窗口状态下的组件'}
      {shouldRenderSidebarMobile && '手机窗口状态下的组件'}
    </>
  );
};
```

## 使用 Algolia DocSearch 🐸

### 申请 DocSearch 程序

- Algolia 是一款强大且一流的 **网站搜索工具**，尤其是对 **在线文档搜索** 这一功能更有优势，它不需要繁琐的配置，也不需要有数据库等软硬件支持，只需要在项目中插入少量代码就可以实现文档搜索功能；
- 由于 [Algolia DocSearch](https://docsearch.algolia.com/docs/who-can-apply) 并不完全是免费的，所以在使用时要先 [申请 DocSearch 程序](https://docsearch.algolia.com/apply/)，并且需满足一些必要的条件，获得专属的 `apiKey`，才能继续使用；
- 申请时要填写该网站的 **部署地址** 和 **个人 📮**，以便 Algolia 抓取网站上的内容并进行分析，对文档中的各级标题，段落内容等信息建立 **索引**，这样在搜索关键字时，就可以请求 DocSearch 的接口并显示搜索结果，如下：

<img src={require('/img/docs/algolia-search/2021-11-05-apply.jpg').default} alt="Example Image" />

- 创建 Algolia 账号，获取唯一的应用程序 id

- 由于没有服务器，后期再进行维护。。。

## 相关链接 🔗

- [Docusaurus 官方文档 - 搜索功能](https://docusaurus.io/zh-CN/docs/search#using-algolia-docsearch)
<!-- - [Docusaurus 官方文档 - themeConfig 主题配置项](https://www.docusaurus.cn/docs/api/themes/configuration) -->
