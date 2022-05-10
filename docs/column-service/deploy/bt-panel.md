---
title: 宝塔面板の 简单使用
id: bt-panel
sidebar_position: 2
toc_max_heading_level: 4
---

```mdx-code-block
import { Image } from '@arco-design/web-react';
```

> 本章节简单介绍如何在 宝塔面板 中部署前端静态网站 & node 项目，及数据库搭建等操作

## 宝塔面板

**宝塔面板** 是一个具有 **可视化** 界面的应用面板，支持 Linux 和 Windows 系统，一键管理服务器，节省操作服务器的时间和成本，还可以安装和搭建网站，或者安装各种开发环境;

## 安装宝塔应用

### Linux 安装宝塔

- 如果云服务器中只有一个纯净的 Linux 操作系统，或者是重装了一个 **系统镜像**，比如腾讯云的 `TencentOS Server`，那么就需要单独安装宝塔应用，并且要尽量保证没有安装过 `nginx/mysql/java` 等应用服务器（当然也可以强制安装），操作如下:
- 👉 _[宝塔官方下载链接](https://www.bt.cn/new/download.html)_

```bash title="iTerm / cmder 工具"
# 查看服务器内核
cat /etc/redhat-release

# ☘️ 安装宝塔面板
wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh

# 验证是否安装成功(通过此命令可以查看宝塔的 默认信息，服务等)
bt
```

- 安装成功之后，会回显宝塔的 **登录地址** 和 **用户名 & 密码**，这需要自己将这些信息记录好，如图:

<Image src={require('./img/2022-01-21.jpg').default} height={360} />

- 按照图片中的地址访问宝塔面板时，默认的 `8888` 的端口号需要在云服务器的 **防火墙** 中添加 **安全组端口规则** 之后，才能正常访问，如图（以腾讯云服务器为例，各服务器的添加规则可能不一样）:

<Image src={require('./img/2022-01-21-anquanzu.jpg').default} />

### 腾讯云 宝塔专享版

- 腾讯云服务器中内置了 **宝塔应用镜像系统**，只需要在重装系统中选择该应用镜像即可;

<Image src={require('./img/2022-01-21-system.jpg').default} height={360} />

- 安装完成之后，再远程登录服务器，输入以下命令查看宝塔的 **默认信息** & **账号密码**;

```bash title="iTerm / cmder 工具"
# ☘️ 查看宝塔的 默认信息
sudo /etc/init.d/bt default
# 或
bt
```

- 登录上宝塔之后，还需要 **关联腾讯云 API 密钥**，按照提示先进行 _[API 密钥创建](https://console.cloud.tencent.com/cam/capi)_，然后再进行关联和使用;

## 访问宝塔应用

- 初次访问宝塔时，需要 **绑定宝塔账号**，可以按照界面提示进行 _[宝塔账号注册](https://www.bt.cn/register.html)_ 再登录;
- 登录成功之后，就可以在服务器进行快捷的 **应用安装** 或 **网站部署**;
- 为了提高安全性，建议修改进入宝塔的 **安全入口**，**默认端口号**，**默认的账号密码** 等信息;

<Image src={require('./img/2022-01-22.jpg').default} height={360} />

## 前端静态网站部署

宝塔可直接通过界面操作来部署前端资源，操作简单快捷，只需以下几步，就能轻松就能完成一个静态网站的简单部署;

- 下载 **nginx** 应用，可以通过初次进入面板时给予的提示自动安装，或者通过 **软件商店** 搜索安装;
- 选择页面左侧 **网站** 面板，**添加新的站点**;
- 输入网站的 **域名**(无域名，输入 ip 地址即可);
- 指定存放前端资源的 **文件目录**;

<Image src={require('./img/2022-01-22-web-create.jpg').default} height={360} />

- 将本地的前端资源 **上传** 到服务器中（要在本地将资源进行 **打包压缩**，提高上传的速率）;

```bash title="iTerm / cmder 工具"
# 打包并压缩本地资源目录
cd [本地项目目录]
tar -czvf build.tar.gz build/
```

- 然后在宝塔的 **文件** 面板中将本地资源上传并解压到指定的网站目录即可;

<Image src={require('./img/2022-01-22-file-panel.jpg').default} />

:::caution 离谱小贴士

- 有时候项目在 **打包** 时，会因为 **nodejs 内存溢出** 而导致项目打包失败，如图:

<Image src={require('./img/2022-01-18-iTerm.jpg').default} height={360} />

- 尝试通过 `node --max-old-space-size=[容量(MB)]` 命令来 **扩大 nodejs 内存** 以解决此问题，容量的可选值为 `[4096, 6096, 8192, ...]`， 可在项目的 `package.json` 文件的脚本命令中修改以下代码:

```diff title="项目/package.json"
{
    "scripts": {
        ...,
        "start": "docusaurus start",
-       "build": "docusaurus build",
+       "build": "node --max-old-space-size=8192 node_modules/@docusaurus/core/bin/docusaurus build",
        ...
    }
}
```

:::

## node.js 项目部署

## 搭建 MySQL 数据库
