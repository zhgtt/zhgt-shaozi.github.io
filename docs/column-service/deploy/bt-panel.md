---
title: 宝塔面板の 简单使用
id: bt-panel
sidebar_position: 2
toc_max_heading_level: 4
---

```mdx-code-block
import { Image } from '@arco-design/web-react';
```

> **宝塔面板** 是一个具有 **可视化** 界面的应用面板，支持 Linux 和 Windows 系统，一键管理服务器，节省操作服务器的时间和成本，还可以安装和搭建网站，在线 **运行终端**，或者安装各种开发环境;

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

<!--
<Image src={require('./img/2022-01-21.jpg').default} width='80%' height={260} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/2022-01-21.jpg' width='80%' height={260} />

- 按照图片中的地址访问宝塔面板时，默认的 `8888` 的端口号需要在云服务器的 **防火墙** 中添加 **安全组端口规则** 之后，才能正常访问，如图（以腾讯云服务器为例，各服务器的添加规则可能不一样）:

<!--
<Image src={require('./img/2022-01-21-anquanzu.jpg').default} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/2022-01-21-anquanzu.jpg' />

### 腾讯云 宝塔专享版

- 腾讯云服务器中内置了 **宝塔应用镜像系统**，只需要在重装系统中选择该应用镜像即可;

<!--
<Image src={require('./img/2022-01-21-system.jpg').default} height={360} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/2022-01-21-system.jpg' height={360} />

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

<!--
<Image src={require('./img/2022-01-22.jpg').default} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/2022-01-22.jpg' />

## 前端静态网站部署

宝塔可直接通过界面操作来部署前端资源，操作简单快捷，只需以下几步，就能轻松就能完成一个静态网站的简单部署;

### 添加网站

- 下载 **nginx** 应用，可以通过初次进入面板时给予的提示自动安装，或者通过左侧菜单栏的 **软件商店** 搜索安装;
- 选择页面左侧 **网站** 面板，**添加新的站点**;
- 输入网站的 **域名**(无域名，输入 ip 地址即可; 可添加多个域名);
- **根目录** - 指定存放前端资源的 **文件目录**;

<!--
<Image src={require('./img/2022-01-22-web-create.jpg').default} height={360} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/2022-01-22-web-create.jpg' height={360}/>

- 网站添加好之后，宝塔会自动将 nginx 配置好，若需要修改，只需要在 **设置** 中修改配置即可; 当然还可以在这里配置其他设置项;

<!--
<Image src={require('./img/bt-website.jpg').default} height={360} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/bt-website.jpg' height={360}/>

### 上传前端资源

- 将本地的前端资源进行 **打包并压缩**，提高上传的速率;

```bash title="iTerm / cmder 工具"
# 打包并压缩本地资源目录
cd [本地项目目录]
tar -czvf build.tar.gz build/
```

- 然后在宝塔的 **文件** 面板中将该资源上传并解压到指定的网站目录即可;

<!--
<Image src={require('./img/2022-01-22-file-panel.jpg').default} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/2022-01-22-file-panel.jpg' />

:::caution 离离原上谱

- 有时项目在 **打包** 时，会因为 **nodejs 内存溢出** 而导致项目打包失败，如图:

<!--
<Image src={require('./img/2022-01-18-iTerm.jpg').default} width='80%' height={260} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/2022-01-18-iTerm.jpg' width='80%' height={260} />

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

### 添加 SSL 证书

- 需要添加 SSL 以使用 https 能访问到网站，在设置中找到 **SSL** 配置项，可以添加多种类型的证书;
- **Let's Encrypt 证书** - 宝塔提供的免费证书，可以直接在线申请，但有效期只有三个月，添加好之后保存即可;
- **自定义证书** - 添加自己申请好的证书，如腾讯云、阿里云的证书，添加好之后保存即可;

<!--
<Image src={require('./img/bt-panel-1.jpg').default} height={360} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/bt-panel-1.jpg' height={360} />

:::caution 离离原上谱

如果 SSL 证书添加好之后，不能使用 https 访问网站，有可能是安全组中没有成功放行 `443` 端口，可以在 **安全** 页面中重新添加(放行) `443` 端口;

<!--
<Image src={require('./img/bt-panel-2.jpg').default} height={260} width='80%' />
-->

<Image src='//aone-time.icu/group1/dino/column-service/bt-panel-2.jpg' height={260} width='80%' />

:::

## go-fastdfs 文件系统 📦

[_go-fastdfs_](https://sjqzhang.github.io/go-fastdfs/#character) 是一个基于 http 协议的 **分布式文件系统**，它具有高性能，高可靠，免维护等优点，可以将文件上传、下载到服务器中;

### 安装应用

- 在服务器中创建一个专门来存放 go-fastdfs 应用系统的文件;

```bash
mkdir /home/gofastdfs && cd /home/gofastdfs/     # 在 /home 目录中创建 gofastdfs 目录并跳转到该目录下
```

- 按照官方文档中的方式，下载 go-fastdfs，并赋予相关权限（最新版本可在 [_开源地址_](https://github.com/sjqzhang/go-fastdfs/releases) 中查看）;

```bash
wget --no-check-certificate https://github.com/sjqzhang/go-fastdfs/releases/download/v1.4.2/fileserver -O fileserver && chmod +x fileserver && ./fileserver
```

- 下载好之后查看文件目录，或修改对应的配置文件（或直接在宝塔的 **文件面板** 中进行操作）;

```bash
# 查看文件目录
ll

# 使用 vim 修改配置文件
cd conf/ && vim cfg.json
```

<!--
<Image src={require('./img/go-fastdfs.jpg').default} width='60%' />
-->

<Image src='//aone-time.icu/group1/dino/column-service/go-fastdfs.jpg' width='60%' />

### 运行服务 & 上传文件

- 运行 go-fastdfs 服务，只需运行 **fileserver** 文件即可，然后使用配置好的端口号进行访问（默认端口号为 `8080`）;

```bash
./fileserver
```

- 在运行之前需要在宝塔的 **安全面板** 中 **添加/放行 对应的端口号**，出现以下界面即运行成功;

- 在上传中如果要 **自定义路径**，需要先将 **默认场景 default** 的内容 **清空** 再上传;

<!--
<Image src={require('./img/go-fastdfs-1.jpg').default} height={360} width="90%" />
-->

<Image src='//aone-time.icu/group1/dino/column-service/go-fastdfs-1.jpg' height={360} width="90%" />

:::caution 离离原上谱

- 由于关闭终端或宝塔都会让 go-fastdfs 服务停止运行，并且服务停止后，上传的文件资源也将会访问不到; 为了避免频繁的启停用服务，可以使用 `nohup` 命令让该服务运行在后台，长期保持运行;

```bash
nohup ./fileserver &       # & 表示让命令可以在后台执行，终端退出后也仍旧执行
```

- 当出现以下类似的输出代码时，表明运行成功;

```bash
nohup: ignoring input and appending output to ‘nohup.out’
```

- 查看进程是否运行成功;

```bash
ps -aux | grep fileserver       # 查找运行的 fileserver 进程
# 或
ps -def | grep fileserver
```

- 根据 `PID` 来删除 / 结束进程，如图，第二列的内容即 `PID`;

<Image src='//aone-time.icu/group1/dino/column-service/nohub-1.png'  width="70%" />

```bash
kill -9 ['PID']  # 9 表示删除的编号
# 或
kill -s 9 ['PID']
```

:::

### 配置项修改 & 域名映射

- 修改一些比较常见的配置项，如下:

```js title="cfg.json"
{
    // ...
	"绑定端号": "端口",
	"addr": ":8081",    // 自定义端口号

    "文件去重算法 md5 可能存在冲突，默认md5": "sha1|md5",
	"file_sum_arithmetic": "sha1",  // 修改为 sha1

    "文件是否去重": "默认去重",
	"enable_distinct_file": false,  // 修改为不去重

	"默认是否下载": "默认下载",
	"default_download": false,  // 开启此项后，生成的文件链接 url 将不再带 download 参数（0 - 预览、1 - 下载）
    // ...
}
```

- 如果想要 **映射域名**，需在配置项中修改指定属性，并且要在 nginx 中配置反向代理，使域名能够成功访问到 go-fastdfs 服务;

```js title="go-fastdfs 配置项"
{
    // ...
	"下载域名": "用于外网下载文件的域名",
	"download_domain": "aone-time.icu",     // 添加指定域名
    // ...
}
```

```bash title="nginx 配置项"
http {
    # ...

    # 🐸 负载均衡，访问 8081 端口（go-fastdfs 服务）
    upstream go-fastdfs {
        server 81.70.239.170:8081;
        ip_hash;
    }

    server {
        # ...

        # 指定以 /group[0-9] 开头的地址来访问 go-fastdfs 服务（不建议将此入口放开）
        location ~ /group([0-9]) {
            # proxy_set_header Host $host;
            # proxy_set_header X-Real-IP $remote_addr;
            # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy-pass    http://go-fastdfs;    # 🐸 反向代理
        }

        # 🐸 访问 go-fastdfs 服务下的图片资源
        # location ~ /group(\d)/.*/.*\.(gif|jpg|jpeg|png|bmp|swf)$     # .* 表示任意字符
        # 或
        location ~ /group(\d).*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            proxy-pass    http://go-fastdfs;
        }
    }
}

```

:::tip 参考资料

- 👉 [Nginx location 匹配顺序 - CSDN](https://blog.csdn.net/qq_40903527/article/details/123778809)
- 👉 [Nginx 之的 location 匹配 && rewrite - CSDN](https://blog.csdn.net/xiaobai316/article/details/120837225)

:::

### go-fastdfs-web 管理平台

- 下载 [_go-fastdfs-web_](https://github.com/perfree/go-fastdfs-web/releases) 最新版本的压缩包;
- 下载好之后上传到服务器中，并且将其解压;
- 解压完成后进入对应的目录，执行以下命令，将 `./goFastDfsWeb.sh` 文件转换一下，以免产生错误;

```bash
sed -i 's/\r//' ./goFastDfsWeb.sh   # 转换

chmod +x goFastDfsWeb.sh    # 给 goFastDfsWeb.sh 添加执行权限
```

- **运行项目**，同 go-fastdfs 一样，需要在宝塔的 **安全界面** 中添加 / 放行项目对应的端口号（默认为 `8088`）;
- 可在 **config/application.yml** 中修改默认的 端口号;
- 该项目默认是在 **后台运行** 的;

```bash
./goFastDfsWeb.sh start
```

- **查看运行状态**（验证是否运行成功）;

```bash
./goFastDfsWeb.sh status
# 或
ps -aux | grep goFastDfsWeb.sh
```

- **重启项目**;

```bash
./goFastDfsWeb.sh restart
```

- **停止运行项目**;

```bash
./goFastDfsWeb.sh stop
```

- 访问对应的端口号，出现以下界面即运行成功，再按照提示进行对应的配置后，方可登录;

<Image src='//aone-time.icu/group1/dino/column-service/go-fastdfs-web.jpg' height={360} width='90%' />

:::tip 参考资料

- 👉 [Linux 部署-GoFastDfs - CSDN](https://blog.csdn.net/weixin_42946608/article/details/118359701)
- 👉 [linux 环境下 go-fastdfs 安装及使用 - CSDN](https://blog.csdn.net/jxlhljh/article/details/123086876)

:::

<!-- ## node 项目部署 -->

<!-- TODO -->

<!-- 待续... -->

<!-- ## 搭建 MySQL 数据库 -->

<!-- TODO -->

<!-- 待续... -->

## 使用宝塔时遇到的问题 📦

##### 不小心为面板开启了 SSL 配置，导致面板页面无法访问，该如何解决?

如图所示，开启 SSL 并且选择了类型为自签证书，从而导致页面无法访问;

<!--
<Image src={require('./img/bt-panel.jpg').default} height={360} />
-->

<Image src='//aone-time.icu/group1/dino/column-service/bt-panel.jpg' height={360} />

解决方法: 使用 `ssh` 进入到服务器中，输入以下命令，之后再刷新页面即可;

```bash
rm -f /www/server/panel/data/ssl.pl && /etc/init.d/bt restart
```
