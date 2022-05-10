---
title: Nginx 配置
id: nginx-config
toc_max_heading_level: 4
---

> Nginx 是一款轻量级的 Web 服务器、反向代理服务器，本章节简单学习它的一些配置项 & 常用命令

## nginx 常用命令

```bash title="iTerm / cmder 工具"
# 查看 nginx 当前的版本信息
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
```

## nginx 部分配置项

```bash title="nginx.conf 配置文件"
server {
    listen       80 default_server;     # 监听的端口号，默认为 80
    listen       [::]:80 default_server;
    server_name  _;     # 网站域名
    root         /home/my-website/build;    # 存放前端资源的目录
    index        index.html;
}
```
