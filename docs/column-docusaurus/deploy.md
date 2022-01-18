---
title: Docusaurus 部署
sidebar_position: 5
toc_max_heading_level: 4
---

> 本章节学习如何在服务器中部署 Docusaurus & nginx 代理

## 腾讯云服务器 & 登录 🐸

### 服务器面板

- 购买完服务器之后，进入到 _[腾讯云服务器 - 控制台中心](https://console.cloud.tencent.com/lighthouse/instance/detail?rid=8&id=lhins-664fbkyy)_;
- 服务器对应的 `IP地址`: `81.70.239.170`(公网);
- **重置系统密码**，用于远程登录 Linux 系统或 Windows 系统;

<img src={require('/img/docs/deploy/2022-01-17.jpg').default} alt="Example Image" />

- 重置密码时，Linux 系统默认用户名为 `root`；Windows 系统默认用户名为 `administrator`；当然都可以自定义用户名;
- 服务器中的 **系统镜像** 默认是 **TencentOS Server**，它是 Linux 操作系统，当然也可以选择重装系统镜像，每次重装之后都需 **重置密码**;
- 服务器中的 **应用镜像** 默认是 **宝塔 Linux 面板**，当然也可以选择重装应用镜像，每次重装之后都需 **重置密码**;

### Linux 系统目录结构

记录一下 Linux 系统中的常用到的目录结构(部分);

```bash title="my-website"
├── 📁 /root
│   └── 📁 etc      # 该目录用来存放系统中的所有配置文件，一般都是以 xxx.conf 的形式命名，比如 nginx 的配置项也在该目录下
│       └── 📁 nginx
│           └── 📃 conf.d      # nginx 配置项文件
│   └── 📁 home     # 主目录，一般用来放置前端资源
│       └── 📁 my-website
│   └── 📁 bin     # 存放二进制可执行文件，常用的命令一般都在这里
```

### ssh 远程登录

- **Mac** 电脑上使用 **iTerm** 命令行工具进行登录;
- **Windows** 电脑上建议下载 _[cmder](https://cmder.net/)_ 工具进行登录;
- 通过 `ssh [用户名]@[IP地址]` 命令进行远程登录（需输入密码）:

```bash title="iTerm / cmder 工具"
# ☘️ 登录
ssh root@81.70.239.170

# ☘️ 退出服务器
exit
```

- 登录成功之后，切换到服务器的根目录下，找到 **/home** 文件夹，自定义创建一个文件夹，用来放置前端资源（个人操作）:

```bash title="iTerm / cmder 工具"
cd /
cd home     # 切换到 /home 文件夹下
pwd         # 查看该目录的路径

ll          # 查看该文件夹下的所有目录（包含详情信息）
ls          # 查看该文件夹下的所有目录（只有文件名）

mkdir my-website    # 创建文件夹

rm -r [文件夹]      # 删除文件夹目录
```

## 部署前端资源 🐸

### 安装 & 启动 nginx

- 安装并启动一个简单的 **nginx**，测试服务器 IP 是否可以正常访问;

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

# ☘️ 优雅的停止 nginx 服务(一个请求被处理完之后才被关闭)
nginx -s quit

# 重启 nginx
nginx -s reopen

# 重新加载 nginx 配置文件，并且以优雅的方式重启 nginx
nginx -s reload

# TODO ☘️ 修改 nginx 配置文件
cd /
cd etc/nginx
```

访问服务器 IP，出现以下页面时，表示可以正常运行;

<img src={require('/img/docs/deploy/2022-01-17-nginx.jpg').default} alt="Example Image" />

### 准备网站资源

#### 使用 git 下载线上资源

- 在 Linux 系统中安装 git 和 nodejs;

```bash title="iTerm / cmder 工具"
# ☘️ 安装 git
yum install git
git --version

# ☘️ 安装 nodejs
yum install nodejs -y
node -v
npm -v

# ☘️ 安装 npm 淘宝镜像 cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm -v
```

:::caution 离谱小贴士

- 由于 **yum** 安装的 nodejs 版本太低，所以需要手动重新安装 nodejs;
- 打开 _[nodejs 官网](http://nodejs.cn/download/)_，下载官方编译好的 Linux 二进制文件，如图;

<img src={require('/img/docs/deploy/2022-01-18.jpg').default} alt="Example Image" />

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
tar -xvf node-v16.13.2-linux-x64.tar     # 解压 tar 文件，-xf: 解压文件的核心指令; -v: 解压时显示压缩包里的文件和详细信息
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

- 最新版本的 nodejs 安装完成之后，将上传到 GitHub / Gitee 中的网站项目 `clone` 到 **home** 目录中;
- 打开 `clone` 好的项目，通过 `npm` 对项目进行 **依赖安装** 或 **运行**;

```bash title="iTerm / cmder 工具"
# 将项目克隆到 home 目录中
cd /home
git clone https://gitee.com/zhgt__xu/zhgt-shaozi.github.io.git

# 更改文件目录名称(个人操作)
mv zhgt-shaozi.github.io [新文件目录名称(github-project)]

# cd 到项目目录下，进行安装运行
cd github-project
cnpm install    # 安装项目依赖
npm run start   # 项目运行
```

- 或打包，将打包好的文件目录(默认为 **/build**)配置在 nginx 中，即可完成部署;

#### 使用 FTP 上传本地资源

### 配置 nginx

## 前端自动化部署 🐸

## 相关链接 🔗

- [Linux 常用命令学习 - 菜鸟教程](https://www.runoob.com/w3cnote/linux-common-command-2.html)
- [Linux vim 编辑的使用 - 菜鸟教程](https://www.runoob.com/linux/linux-vim.html)
- [Linux yum 命令学习 - 菜鸟教程](https://www.runoob.com/linux/linux-yum.html)
