---
title: Linux 系统入门
id: linux-learn
sidebar_position: 3
toc_max_heading_level: 4
---

```mdx-code-block
import { Image } from '@arco-design/web-react';
```

> 云服务器中安装的是 Linux 系统，可以在本地使用 `ssh` 远程登录云服务器之后，以 **命令行** 的形式对 Linux 系统进行文件操作，应用环境安装，前端静态网站部署等

## Linux 系统目录结构

了解 & 记录部分 Linux 系统中的目录结构;

```bash title="my-website"
├── 📁 /root
│   └── 📁 etc      # 该目录用来存放系统中的所有配置文件，一般都是以 xxx.conf 的形式命名，比如安装好的 nginx 的配置项也在该目录下
│       └── 📁 nginx
│           └── 📃 conf.d      # nginx 配置项文件
│   └── 📁 home     # 主目录，一般用来放置前端资源
│       └── 📁 my-website
│   └── 📁 bin     # 存放二进制可执行文件，常用的命令一般都在这里
```

## 应用 & 环境的安装

### nginx 安装

- 安装 & 启动一个简单的 **nginx**，测试服务器 IP 是否可以正常访问;

```bash title="iTerm / cmder 工具"
# ☘️ 下载并安装 nginx
yum install nginx -y

# 查看 nginx 当前的版本信息，检测是否安装成功
nginx -v     # 仅显示版本
nginx -V     # 显示版本，编译器版本和配置参数信息

# ☘️ 启动 nginx
nginx

# 强制(快速)停止 nginx 服务
nginx -s stop
```

- 访问服务器 IP，出现以下页面时，表示可以正常运行;

<Image
src={require('@site/static/image/column-service/2022-01-17-nginx.jpg').default}
width="90%" />

- 如果要对 nginx 配置文件进行修改，需找到该文件，使用 `vim` 对其进行编辑;

```bash title="iTerm / cmder 工具"
# ☘️ 进入 nginx 的配置文件
vim /etc/nginx/nginx.conf
i      # 输入 i 进入编辑模式
```

### nodejs 安装

```bash title="iTerm / cmder 工具"
# ☘️ 安装 nodejs
yum install nodejs -y
node -v
npm -v

# ☘️ 安装 淘宝镜像 cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm -v
```

:::caution 离谱小贴士

- 由于 **yum** 安装的 nodejs 版本太低，所以需要手动重新安装 nodejs;
- 打开 _[nodejs 官网](http://nodejs.cn/download/)_，下载官方编译好的 Linux 二进制文件，如图;

<Image src={require('@site/static/image/column-service/2022-01-18.jpg').default} width="90%" />

- 点击右键 **复制链接地址**，然后使用 `wget` 和 `tar` 命令下载并解压该文件;

```bash title="iTerm / cmder 工具"
# ☘️ 使用 yum 卸载原 nodejs 包
yum remove nodejs

# 新建一个用来存放下载资源的文件目录(个人操作)
cd /
mkdir Downloads
cd Downloads

# ☘️ 下载 nodejs 官方资源包
wget https://npmmirror.com/mirrors/node/v16.13.2/node-v16.13.2-linux-x64.tar.xz

# ☘️ 解压 nodejs 资源包
xz -d node-v16.13.2-linux-x64.tar.xz     # 解压 xz 文件，解压之后会删除压缩包
tar -xvf node-v16.13.2-linux-x64.tar     # 解压 tar 文件，-x: 解压; -f: 解压的文件; -v: 解压时显示压缩包里的文件和详细信息
```

- 解压之后的 nodejs 资源是一个独立程序包，放到任意位置都能执行，但为了全局使用，还是需要配置一下 **环境变量**;

```bash title="iTerm / cmder 工具"
# ☘️ 配置环境变量，使用 vim 进行编辑
vim /etc/profile       # 进入只读模式
i      # 输入 i 进入编辑模式

# ☘️ 在 profile 文件的底部添加以下代码
export NODE_HOME=/Downloads/node-v16.13.2-linux-x64
export PATH=$NODE_HOME/bin:$PATH

# ☘️ 保存并离开 vi 编辑器
ESC     # 按 ESC 返回只读模式
:wq     # 保存并退出
:q      # 在未编辑的情况下，直接退出
:q!     # 在编辑但不想保存的情况下，强制退出

# ☘️ 刷新 /etc/profile 配置
source /etc/profile

# 验证 nodejs 版本是否最新
node -v
```

:::

### git 安装

```bash title="iTerm / cmder 工具"
# ☘️ 安装 git
yum install git

git --version
```

## 前端静态网站部署

在服务器中创建一个用来存放前端项目 **打包** 后的资源的文件目录（以 **/home/my-website** 为例）

### 使用 git 下载项目资源

- 将 GitHub / Gitee 中的项目 `clone` 到指定目录中（以 **/home** 为例）;
- 进入到项目中，通过 `npm` 对项目进行 **依赖安装** 和 **打包**;

```bash title="iTerm / cmder 工具"
# ☘️ 将项目克隆到 home 目录中
cd /home
git clone https://gitee.com/zhgt__xu/zhgt-shaozi.github.io.git
git pull origin main    # 强制拉取线上最新代码

# 更改文件目录名称(个人操作)
mv zhgt-shaozi.github.io github-project

# cd 到项目目录下，进行安装运行
cd github-project
cnpm install    # 安装项目依赖
npm run build   # 项目打包
```

- 将打包好的文件目录，复制到之前创建好的 **/home/my-website** 目录下，再手动 **配置 nginx**，即可完成部署;

```bash title="iTerm / cmder 工具"
# ☘️ 复制打包的文件目录
cd /home
cp -a github-project/build my-website
```

:::danger 缺点
每次项目代码更新后，都得需要在服务器中 **拉取最新代码**，然后重新进行 **打包**，最后再 **迁移 build 目录(个人操作，可省略)**；步骤稍显繁琐;
:::

### 使用 `SCP` 上传资源(推荐)

- `scp` 命令是 Linux 系统中基于 `ssh` 登录进行安全的(加密的)远程文件 **传输或下载** 的命令，操作如下:

```bash title="iTerm / cmder 工具"
# ☘️ 对本地项目已经 build 好的文件目录进行打包 & 压缩(以减少文件传输时的带宽)，生成一个 .tar.gz 后缀的文件
cd [本地项目目录]
tar -cvf build.tar build/        # -c: 创建一个打包文件
gzip build.tar      # 默认压缩之后会删除 源文件，会生成一个后缀为 .gz 的文件
# 或
tar -cvzf build.tar.gz build/       # -z: 表示 gzip 的压缩包

# ☘️ 将压缩好的文件传输到服务器的指定目录中(输入密码即可)
scp build.tar.gz root@SERVER_IP:/home/my-website/build.tar.gz

# 传输完成之后在登录到服务器中，查看是否传输成功
ssh root@SERVER_IP
cd /home/my-website
ls

# ☘️ 解压并删除 .tar.gz 文件
tar -xvzf build.tar.gz
rm -r build.tar.gz
```

- 完成上述操作之后，再手动 **配置 nginx**，即可完成部署;

<!-- ## 前端自动化部署

> 待学习并完善，需要学习 webhooks，node 及 gitee，Jekins 等自动化部署相关技术知识 -->

## 参考链接

- 👉 [Linux 常用命令学习 - 菜鸟教程](https://www.runoob.com/w3cnote/linux-common-command-2.html)
- 👉 [Linux vim 编辑的使用 - 菜鸟教程](https://www.runoob.com/linux/linux-vim.html)
- 👉 [Linux yum 命令学习 - 菜鸟教程](https://www.runoob.com/linux/linux-yum.html)
