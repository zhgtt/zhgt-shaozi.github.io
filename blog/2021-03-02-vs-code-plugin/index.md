---
slug: docusaurus2-vscode
title: VS Code 拓展插件整理
authors: [shaozi]
tags: [VS Code 编辑器]
# hide_table_of_contents: true
toc_max_heading_level: 2
---

```mdx-code-block
import { Image } from '@arco-design/web-react';
import useBaseUrl from '@docusaurus/useBaseUrl';
```

> 🤡 写在前面：VS Code 编辑器的强大之处就在于有很多社区或团队提供的拓展插件，可以帮助个人提高开发效率，节省开发成本；该文章主要介绍个人在开发中一些常用到的拓展插件；

<!--truncate-->

---

## VS Code 工具类插件(常用)

### `Chinese 中文语言包`

- 适用于 VS Code 的中文语言包，安装完重启 VS Code 即可;
- 推荐指数: 👍 👍 👍

### `Project Manager 项目管理器`

- 本地项目管理器，可以对本地多个项目进行统一管理;
- **会在侧边工具栏中生成该插件菜单**，可在菜单中对项目进行配置，分类，快速切换 / 打开项目;
- 推荐指数: 👍 👍 👍 👍 👍

### `Todo Tree 代码标记`

- 在代码的注释中定义标签，来标记该代码块，并且该标签可高亮显示，比如 `TODO`, `BUG` 等标记;
- **会在侧边工具栏中生成该插件菜单**，可在菜单中找到自己标记过的代码，并快速定位到该代码块的位置；
- 推荐指数: 👍 👍 👍

- 该插件的相关配置:

```jsx title="settings.json 中关于 Todo Tree 的配置"
{
  ...
  "todo-tree.regex.regex": "(//|#|<!--|; |/\\*|^|^\\s*(-|\\d+.))\\s*($TAGS)", // 匹配注释格式
  "todo-tree.tree.showScanModeButton": false,
  "todo-tree.highlightsHighlight": {
    "type": "tag", // 样式突出程度，tag - 默认，仅突出标签；text - 突出标签及后面的文字
    "gutterIcon": true, // 是否在代码的左侧栏显示图标
    "foreground": "white" // 字体颜色
  },
  "todo-tree.general.tags": ["TODO", "[x]"],  // 指定标签
  // 对指定的标签进行样式配置
  "todo-tree.highlights.customHighlight": {
    "TODO": {
      "background": "#14b8a6", // 背景色
      "foreground": "white", // 字体颜色
      "icon": "issue-reopened", // 图标
      "iconColour": "#14b8a6", // 图标颜色
      "gutterIcon": true // 在代码的侧边显示图标
      // "rulerColour": "#14b8a6",
      // "borderRadius": "0", // 圆角
    },
    "[x]": {
      "icon": "eye-closed",
      "background": "#d1d5db",
      // "iconColour": "#d1d5db",
      "foreground": "#4b5563"
    }
  },
}
```

### `advanced-new-file 快速创建文件`

- 通过快捷键快速指定目录，并在该目录下创建新文件；
- 快捷键：`Ctrl + Alt + N` 或 `option(⌥) + command(⌘) + N`；
- 推荐指数: 👍 👍 👍

### `Image preview 图片显示`

- 代码中引入图片时，会自动在编辑器的左侧进行显示，便于查看自己引入的图片;
- 推荐指数: 👍 👍 👍 👍

### `SVG Viewer 图片预览`

- 可以在 VS Code 中预览 SVG 图片，选中 SVG 文件，**点击右键 - SVG Viewer 选项** 进行预览;
- 推荐指数: 👍 👍 👍 👍

### `Live Server`

- 可以将本地的项目启动一个静态服务，以便在浏览器中运行；
- 推荐指数: 👍

### `Jest 测试插件`

- 代码单元测试时的辅助工具，保存即可自动运行 **run test**；
- 推荐指数: 👍

:::caution 离谱小贴士

在该项目中，在 markdown 的标题中单独 ✍🏻 'Jest' 时，不管是什么格式，在个人本地项目中都会产生与 Jest 相关的报错信息；

:::

## 主题 & 图标类插件 🎨

### `Palenight Theme`

- 常用的主题库，以 蓝紫色 为主色调；
- 推荐指数: 👍 👍 👍 👍

### `Material Theme`

- 主题库，内置多种主题；
- 推荐指数: 👍 👍 👍

### `Github Theme`

- Github 主题色，提供暗色和亮色两种主题；
- 推荐指数: 👍

### `Horizon Theme`

- 夕阳主题色，想使用亮色主题时推荐该主题；
- 推荐指数: 👍

### `Material Icon Theme`

- 常用的图标库；
- 推荐指数: 👍 👍 👍 👍

### `vscode-icons`

- 图标库；
- 推荐指数: 👍 👍

## 代码辅助类插件

### `javascript console utils 快速打印输出内容`

- 选中一块代码时，可通过快捷键快速生成该代码对应的 `console.log`；
- 快捷键：`Ctrl + Shift + L` 或 `shift(⇧) + command(⌘) + L`；
- 推荐指数: 👍 👍 👍 👍 👍

### `Bracket Pair Colorizer 代码括号高亮`

- 将代码中的任意括号进行高亮显示，提升代码的辨识度;
- 推荐指数: 👍 👍 👍 👍 👍

### `Path Intellisense 路径补全`

- 在代码中引入文件路径时，会自动进行提示并补全;
- 推荐指数: 👍 👍 👍 👍

### `JavaScript(ES6) Code snippets 代码提示`

- js / es6 代码提示，代码块辅助；
- 推荐指数: 👍 👍

### `ES7 React/Redux/... 代码提示`

- react / redux / react-native 等框架的代码提示，代码块辅助；
- 推荐指数: 👍 👍

### `Code Runner 代码运行`

- 可以直接在 VS Code 的终端中对 js 文件运行并输出，**点击右键 - Run Code** 运行；
- 推荐指数: 👍 👍

### `DotEnv 代码高亮`

- 高亮 **.env** 文件中的代码；
- 推荐指数: 👍 👍

## 代码检测 & 格式化插件

### `ESLint`

- js & ts 常用代码检测工具；
- 推荐指数: 👍 👍 👍 👍

### `Prettier - Code formatter 代码格式化`

- 代码格式化插件，可以配合 **ESLint** 一起使用；
- 在项目的根目录下创建 **.prettierrc** 文件，可自定义代码格式化的一些配置；
- 在项目的根目录下创建 **.prettierignore** 文件，可指定一些文件，让其忽略格式化；
- 通过快捷键 `Shift + Alt + F` 或 `option(⌥) + shift(⇧) + F` 快速格式化代码；
- 推荐指数: 👍 👍 👍 👍 👍

- 该插件的相关配置:

```jsx title=".prettierrc 文件（json 格式）中的部分配置项"
{
  // ⭐️ 一行代码超过指定数量的字符时，进行换行，默认为 80 个字符
  "printWidth": 100,

  // tab 键缩进的字节数，默认为 2 个字节
  "tabWidth": 2,

  // ⭐️ 是否在每条代码语句的末尾添加分号 / 逗号，默认为 true
  "semi": true,

  // ⭐️ 是否使用单引号代替双引号来表示字符串，默认为 false
  "singleQuote": true,

  /** 给对象属性（key）添加引号的方式，默认为 "as-needed"
   *  "as-needed" - 仅在需要时添加引号
   *  "consistent" - 只要对象中有一个 key 添加了引号，则其他 key 也进行添加
   *  "preserve" - 对对象中添加了引号的 key 不进行格式化处理（尊重开发者的输入）
   */
  "quoteProps": "as-needed",

  // ⭐️ 是否在 JSX 中使用单引号代替双引号来表示字符串，默认为 false
  "jsxSingleQuote": true,

  /** 给多行对象，数组添加拖尾逗号的方式，默认为 "es5"
   *  "es5" - 在 es5 中给有效的对象，数组添加拖尾逗号
   *  "none" - 没有拖尾逗号
   *  "all" - 尽可能的给所有对象，数组添加拖尾逗号，包括函数参数，调用等
   */
  "trailingComma": "all",

  // 是否给对象括号中的内容两端添加空格，默认为 true
  "bracketSpacing": true,

  // 如果 HTML 闭合标签有多行属性时，> 是否放在最后的末尾，而不是另起一行（不适用于自闭合标签），默认为 false
  "bracketSameLine": false,

  /** 函数如果只有一个参数时，给其添加括号的方式，默认为 "always"
   *  "always" - 始终添加括号
   *  "avoid" - 尽可能的添加括号
   */
  "arrowParens": "always",

  // ...更多配置还需查看官方文档中的配置选项 🍋
}
```

### `Vetur`

- vue 代码提示 & 代码块辅助 & 格式化；
- 该插件会和 **ESLint** 中的一些默认配置冲突，可统一使用 **prettier** 插件进行格式化，或者在 **settings.json** 文件中单独配置；
- 推荐指数: 👍 👍 👍

## Git 相关插件

### `GitLens 查看 Git 提交信息`

- 查看当前分支的 git 提交历史记录 & 提交信息，以及当前文件的历史版本，tags 目录等，并且在书写代码时，会自动显示该行代码的开发人员信息，开发时间等，功能较完善；
- 该插件的功能默认会显示在侧边菜单栏中的 **源代码管理** 中，如果想让它单独成一个菜单显示，需要调出 VS Code 命令面板，输入 **gitlens** 后，选择 `GitLens: Set Views Layout`，再选择 `GitLens Layout` 即可单独显示为一个菜单；
- 推荐指数: 👍 👍 👍 👍 👍

### `Git History 查看文件的提交历史记录`

- 查看当前分支的 git 提交历史记录 & 提交信息，以及当前文件的历史版本；
- 调出 VS Code 命令面板，输入 **git history** 后选择 `Git: View File History` 或 `Git: View History(git log)` 或 `Git: View Line History` 以进行查看；
- 推荐指数: 👍 👍 👍

### `Git Emoji Commit`

- 通过工具栏菜单提交代码时，可以给 commit 信息加一个表情；
- 推荐指数: 👍 👍 👍

## HTML & CSS 相关插件

### `Color Info 颜色显示`

- 对 CSS / SCSS / LESS 文件中的颜色进行提示并高亮;
- 可以进行 **十六进制颜色码** 和 **RGB 颜色值** 之间的转换;
- 推荐指数: 👍 👍 👍 👍 👍

### `Open in browser`

- 可以将本地的 HTML 文件在默认浏览器中打开，**点击右键 - Open In Default Browser** 运行即可（仅限于静态的 HTML 文件）；
- 推荐指数: 👍

### `HTML Snippets 代码提示`

- 书写 HTML 代码时的常用插件，对 HTML 代码，语法进行提示，补全;
- 推荐指数: 👍 👍 👍

### `Auto Rename Tag 标签自动补全`

- 对 HTML 标签自动补全 / 重写，支持任何语言中的 HTML 标签;
- 推荐指数: 👍 👍 👍 👍

### `Auto Close Tag 标签自动补全`

- 对 HTML 标签自动闭合，对 `JSX` 的支持性很好，和 `Auto Rename Tag` 插件功能相似;
- 推荐指数: 👍 👍 👍

### `Highlight Matching Tag 标签高亮`

- 高亮显示 HTML 的闭合标签，提升代码的辨识度;
- 推荐指数: 👍 👍 👍 👍

### `SCSS Everywhere 类名提示`

- 可在 HTML 标签中，对 scss 文件中的类名进行代码提示（有时不会很准）；
- 推荐指数: 👍

### `SCSS IntelliSense 代码提示`

- scss 变量 & 方法的智能联想提示，即便没有引入 scss 变量的文件，也会自动找出定义过的 scss 变量（仅限于 scss 文件中使用）；
- 推荐指数: 👍

### `IntelliSense for CSS ... 类名提示`

- 对 CSS 变量的智能联想提示（仅支持 CSS 语法）；
- 推荐指数: 👍

## 娱乐 & 闲鱼类插件

### `Power Mode 代码特效`

- 书写代码时的特效，内置多种效果样式；
- 推荐指数: 👍 👍 👍 👍 👍

### `CodeSnap 截图`

- 代码快照，截图，选中代码后，**点击右键** 选择运行 CodeSnap，会对代码进行截图；
- 生成的截图可以调整大小，通过点击 **上方的快门图标** 对该图片保存到磁盘；
- 推荐指数: 👍 👍 👍

### `Code Spell Checker 单词检测`

- 检查英文单词是否拼写错误 ❎，错误或者格式不正确的单词会高亮提示；
- 使用快捷键：`Ctrl + .` 或 `command(⌘) + .` 可以给出单词的正确提示；
- 推荐指数: 👍 👍 👍

### `Time Master`

- 阿里 ice 团队开源的 AppWorks 插件中的一个，用于查看当天使用编辑器的情况，以及项目的代码编写率；
- **会在侧边工具栏中生成该插件菜单**，可点击该菜单以查看 Time Master 面板；
- 推荐指数: 👍

### `background-cover 设置编辑器的背景`

- 自定义设置 VS Code 编辑器的背景图片，并可以进行透明度，是否随机出现等设置；
- 推荐指数: 👍 👍

## 相关链接

- [Todo Tree 插件的官方文档教程](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
- [Todo Tree 插件的官方指定图标链接](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
- [Prettier 插件官方文档教程 - 配置选项](https://prettier.io/docs/en/options.html)
