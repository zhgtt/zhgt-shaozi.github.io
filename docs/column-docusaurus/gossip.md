---
title: Docusaurus 拓展
id: gossip
sidebar_position: 6
toc_max_heading_level: 4
---

```mdx-code-block
import BrowserWindow from '@site/src/components/BrowserWindow';
```

> 本章节学习 Docusaurus 常用的全局 API & 搜索功能

## Docusaurus 常用的全局 API

### 全局组件

#### `Link` 组件

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

#### `Translate` 组件

- Docusaurus 提供的 **翻译** 组件，它需指定一个唯一 `id`，用来在 **/i18n** 的 JSON 文件中匹配对应的语言字符;
- 此外还提供了一个 `translate` 函数，用在原生标签或组件的属性中，比如 `title`，`aria-label` 等;

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

#### `CodeBlock` 组件

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
    <CodeBlock language='jsx' style={{ textAlign: 'left' }} title='标题'>
      {codeExample}
    </CodeBlock>
  );
};
```

#### `Tabs` 组件

- Docusaurus 提供的 **选项卡** 组件，需配合 `TabItem` 一起使用;
- 页面中如果定义了多个 `Tabs` 组件，需给每个组件指定唯一的属性 `groupId`，避免多个组件间相互干扰;

```jsx {2-3} title="src/pages/index.tsx"
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.scss';

const Homepage = () => {
  return (
    <>
      {/* 普通用法 */}
      <Tabs className='className' groupId='fruits-group'>
        <TabItem value='apple' label='标题-Apple' default>
          This is an apple 🍎
        </TabItem>
        <TabItem value='orange' label='标题-Orange'>
          This is an orange 🍊
        </TabItem>
      </Tabs>

      {/* Tabs 定义默认值 & 自定义 TabItem 的属性和样式 */}
      <Tabs
        defaultValue='apple'
        values={[
          { label: '标题-Apple', value: 'apple' },
          { label: '标题-Orange', value: 'orange' },
        ]}
      >
        <TabItem value='apple' attributes={{ className: styles.red }}>
          This is an apple 🍎
        </TabItem>
        <TabItem value='orange' attributes={{ className: styles.red }}>
          This is an orange 🍊
        </TabItem>
      </Tabs>
    </>
  );
};
```

```scss title="styles.module.scss"
.red {
  color: red;
}
.red[aria-selected='true'] {
  border-bottom-color: red;
}

.orange {
  color: orange;
}
.orange[aria-selected='true'] {
  border-bottom-color: orange;
}
```

#### `Admonition` 组件

- Ducusaurus 提供的 **告示框** 组件，样式功能同 markdown 中的一致，只是多了 **自定义图标** 的功能;

```jsx {2} title="src/pages/index.tsx"
import React from 'react';
import Admonition from '@theme/Admonition';

const Homepage = () => {
  return (
    <Admonition type='tip' icon='💡' title='行万里路...'>
      <p>Welcome to my website</p>
    </Admonition>
  );
};
```

#### `ThemedImage` 组件

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

### Hooks 函数 & 上下文对象

#### `useDocusaurusContext` 函数

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

#### `useBaseUrl` 函数

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

#### `useThemeConfig` 函数

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

#### `useWindowSize` 函数

- 该函数是一个 **React Hooks 函数**，用来获取 **浏览器窗口的视图状态**;

```jsx title="src/pages/index.tsx"
import React from 'react';
// highlight-next-line
import useWindowSize from '@docusaurus/theme-common';

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

#### `useColorMode` 函数

- 该函数是一个 **React Hooks 函数**，用来获取或设置当前 **主题的状态**;

```jsx title="src/pages/index.tsx"
import React from 'react';
// highlight-next-line
import { useColorMode } from '@docusaurus/theme-common';

const Homepage = () => {
  // highlight-start
  const {
    colorMode, // 当前主题，只有 'light' 和 'dark' 两值
    isDarkTheme, // 当前主题是否为夜间主题（将要废弃）
    setLightTheme, // 设置当前主题为日间主题，它是一个函数
    setDarkTheme, // 设置当前主题为夜间主题，它是一个函数
  } = useColorMode();
  // highlight-end

  return (
    <>
      <h2>{colorMode === 'dark' ? '暗黑(夜间)主题' : '日间主题'}</h2>
      <button onClick={() => setDarkTheme()}>切换至夜间主题</button>
    </>
  );
};
```

示例:

```mdx-code-block
import { useColorMode } from '@docusaurus/theme-common';
import { Button, Space } from '@arco-design/web-react';

export const ExampleComponent = () => {
  const { setLightTheme, setDarkTheme} = useColorMode();
  return (
    <>
      <h4 style={{ marginBottom: 8 }}>主题切换</h4>
      <Space size='large'>
        <Button type='primary' onClick={() => setLightTheme()}>日间 🌞</Button>
        <Button type='dashed' onClick={() => setDarkTheme()}>夜间 🌜</Button>
      </Space>
    </>
  )
}

<BrowserWindow>
  <ExampleComponent />
</BrowserWindow>
```

## 使用 Algolia DocSearch

### 申请 DocSearch 程序

- Algolia 是一款强大且一流的 **网站搜索工具**，尤其是对 **在线文档搜索** 这一功能更有优势，它不需要繁琐的配置，也不需要有数据库等软硬件支持，只需要在项目中插入少量代码就可以实现文档搜索功能；
- 由于 [Algolia DocSearch](https://docsearch.algolia.com/docs/who-can-apply) 并不完全是免费的，所以在使用时要先 [申请 DocSearch 程序](https://docsearch.algolia.com/apply/)，并且需满足一些必要的条件，获得专属的 `apiKey`，才能继续使用；
- 申请时要填写该网站的 **部署地址** 和 **个人 📮**，以便 Algolia 抓取网站上的内容并进行分析，对文档中的各级标题，段落内容等信息建立 **索引**，这样在搜索关键字时，就可以请求 DocSearch 的接口并显示搜索结果，如下：

- 创建 Algolia 账号，获取唯一的应用程序 id

- 由于没有服务器，后期再进行维护。。。

## 相关链接

- [Docusaurus 官方文档 - 搜索功能](https://docusaurus.io/zh-CN/docs/search#using-algolia-docsearch)
<!-- - [Docusaurus 官方文档 - themeConfig 主题配置项](https://www.docusaurus.cn/docs/api/themes/configuration) -->
