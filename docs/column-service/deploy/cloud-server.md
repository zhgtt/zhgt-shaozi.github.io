---
title: 云服务器
id: cloud-server
sidebar_position: 1
toc_max_heading_level: 4
---

```mdx-code-block
import { Image } from '@arco-design/web-react';
```

> 本章节会简单介绍云服务器的使用，域名申请 & 免费的证书申请和安装

## 腾讯云服务器

### 服务器面板介绍

- 进入 _[腾讯云服务器 - 控制台中心](https://console.cloud.tencent.com/lighthouse/instance/detail?rid=8&id=lhins-664fbkyy)_ 页面，就可以看到服务器对应的公网 `IP地址`;
- **重置系统密码**，用于远程登录服务器中的 Linux 系统或 Windows 系统;

<Image src={require('./img/2022-01-17.jpg').default} height={360} />

- 重置密码时，Linux 系统默认用户名为 `root`；Windows 系统默认用户名为 `administrator`；当然都可以自定义用户名;
- 服务器中的 **系统镜像** 是一个纯净版的操作系统，可以选择重装系统镜像（Linux 或 Windows），每次重装之后都需 **重置密码**;
- 服务器中的 **应用镜像** 是在原操作系统的基础上另外安装了 **宝塔**，**Docker** 等其他应用，可以选择重装应用镜像，每次重装之后都需 **重置密码**;

### 域名申请 & 证书安装

- **域名购买 & 注册**:
  - 进入 _[腾讯云服务器 - 域名管理](https://console.cloud.tencent.com/domain)_ 界面，进行 _[域名购买 & 注册](https://buy.cloud.tencent.com/domain?from=console)_;
  - 注册域名时，需要添加实名审核过的 _[信息模板](https://console.cloud.tencent.com/domain/template)_;
  - 域名注册成功后，需要提前在域名管理信息中下载 **域名证书**，以便备案时使用;
- **网站备案**:
  - 根据以下文档指引完成 _[备案](https://console.cloud.tencent.com/beian/manage/orders)_ 审核，且备案通过后，还需进行公安备案，以免影响网站的正常使用(备案结果可能需要等待几天);
  - 👉 _[PC 端备案指引](https://cloud.tencent.com/document/product/243/18958)_
  - 👉 _[小程序 备案指引](https://cloud.tencent.com/document/product/243/37402)_
  - 👉 _[网络公安 备案指引](https://cloud.tencent.com/document/product/243/19142)_
- **域名解析**:
  - 将域名指向服务器的公网 IP 地址，也就是通过域名来访问服务器地址;
  - 进入 _[域名解析列表](https://console.cloud.tencent.com/cns)_ 界面，对域名进行解析:
- **安装 SSL 证书**:
  - 开启 HTTPS 协议, 提供身份验证和数据加密传输等方案, 提高网站的安全性;
  - 进入 _[腾讯云 SSL 证书管理](https://console.cloud.tencent.com/ssl)_ 界面，可申请免费证书(仅支持**单域名**);

## `ssh` 远程登录云服务器

- **Mac** 电脑上使用 **iTerm** 命令行工具进行登录;
- **Windows** 电脑上建议下载 _[cmder](https://cmder.net/)_ 工具进行登录;
- 输入 `ssh [用户名]@[IP地址]` 命令和密码，进行远程登录:

```bash title="iTerm / cmder 工具"
# ☘️ 登录
ssh root@SERVER_IP

# ☘️ 退出服务器
exit

# 登录成功之后，就可以对服务器中的系统文件进行操作
cd /
cd home     # 切换到 /home 文件夹下
pwd         # 查看该目录的路径

ll          # 查看该文件夹下的所有目录（包含详情信息）
ls          # 查看该文件夹下的所有目录（只有文件名）

mkdir [文件目录]    # 创建文件目录

rm -r [文件目录]      # 删除文件目录
```

:::caution 离谱小贴士

- 有时候在云服务器中进行 **系统重装** 后，在本地运行 `ssh` 远程登录，会出现以下错误:

<Image src={require('./img/2022-01-21-ssh-error.jpg').default} />

- 出现该错误的原因: 由于服务器的 **公钥(public key)** 发生了改变（比如重装了系统），而电脑客户端存储的信息并没有发生变化，导致 `ssh` 登录时，信息匹配不正确，从而产生错误警告;
- 解决方法如下: 找到本地电脑 `ssh` 存储信息的文件目录（**.ssh/known_hsots**），手动将其删除，再重新进行远程登录:

```bash title="iTerm / cmder 工具"
# ☘️ 找到 known_hsots 文件目录并将其删除
cd ~/.ssh
ls      # 查看 known_hsots 目录是否存在
rm -r known_hsots

# 再重新登录 服务器
ssh root@SERVER_IP
```

:::
