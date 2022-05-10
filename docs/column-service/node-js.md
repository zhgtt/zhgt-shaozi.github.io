---
title: Node.js 入门
id: nodejs-introduction
toc_max_heading_level: 4
---

```mdx-code-block

```

> 本章节会简单的介绍 NodeJs 中的部分核心模块，以及本地搭建一个简易的 Web 服务器，并尝试连接数据库;

## NodeJs 简介

- `Node.js` 简单来说就是运行在服务端的 JavaScript, 只需下载安装好 node 应用(可能会需要手动配置环境变量), 就能在命令行中通过 node 直接运行 js 文件(可忽略 .js 后缀);
- `Node.js` 使用 **单线程 & 事件循环模型** 来处理并发请求，但是它所谓的单线程，只是 **主线程是单线程**，大部分的网络请求或异步阻塞任务都交给了内部的 **线程池** 实现，本身只负责不断的往返调度，由 **事件循环** 不断的驱动事件执行;
- 因此 `Node.js` 在处理 **I/O 密集** 的场景中所占用的资源和内存较少，效率更高;
- `Node.js` 提供了大量的 API 模块，比如 **文件读写**，**创建 Web 服务** 等;

:::info 参考资料

- 👉 [NodeJs 官方下载地址](https://nodejs.org/zh-cn/download/)
- [什么是 I/O(Input/Output) 流操作 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945227202752)
- [浅谈 Node.js 单线程模型 - 博客](https://menggege.github.io/2017/07/15/nodeJS/)

:::

## http 模块

> 该模块是 JS 编写 Web 服务器程序的核心模块，简单来说就是可以通过该模块实现对外(客户端)的 **服务接口(API)**;<br/>以下介绍部分 `http` 提供的实例类或方法

### `http.createServer()`

- 该方法可以 **创建** 一个 HTTP 服务器，返回 [`http.Server`](#http-server) 类的实例;
- **参数**:

```ts
http.createServer(requestListener: (req: http.IncomingMessage, res: http.ServerResponse) => void)
// requestListener: 是一个回调函数，可在该回调中处理单独的请求或响应; 该回调函数的参数只接收 http.IncomingMessage 和 http.ServerResponse
```

- **用法示例**

```js
// 导入 http 模块
const http = require('http');
// 创建 HTTP 服务
http.createServer((req, res) => {
  // 使用此回调处理每个单独的请求或响应
});
```

### `http.Server` 类 {#http-server}

> 该实例是一个 **基于事件** 的实例类，需要为不同的事件指定响应的处理函数，即可完成对应的功能;

#### `server.on()`

- 该方法是一个 **事件处理** 函数，当指定某一事件后，服务器只要监听到该事件，就会触发对应的处理函数;
- **参数**:

```ts
server.on(event: string, listener: () => void)
// event: 指定一个事件
// listener: 事件所对应的处理函数，不同事件所对应的处理函数也不同
```

- **用法示例**:

```js
const http = require('http');
const server = http.createServer();
// 指定 request 事件，当服务器接收到请求时，就会触发该事件
server.on('request', (req, res) => {
  // 使用此回调处理每个单独的请求或响应
});
```

#### `server.listen()`

- 该方法会 **启动** 已经创建好的 HTTP 服务器，并 **监听一个端口号** 进行连接;
- **参数**:

```ts
server.listen(port: number, hostname?: string, listeningListener?: () => void)
// port: 指定一个端口号
// hostname: 指定本机域名（该参数可省略）
// listeningListener: 服务器启动之后的回调
```

- **用法示例**:

```js
const http = require('http');
const server = http.createServer();
// 监听 3333 端口
server.listen(3333, () => {
  console.log('服务器启动成功');
});
```

### `http.IncomingMessage`

> 该实例对象作为 `requestListener` 函数中的第一个参数，表示接收到的客户端的数据 **请求** 对象; 一般用 `request` 表示;

常用属性和方法如下，更多属性可查看 _[官方文档](http://nodejs.cn/api/http.html#class-httpincomingmessage)_:

| 属性(方法)                                                             | 类型     | 描述                                                                                |
| ---------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| _[headers](http://nodejs.cn/api/http.html#messageheaders)_             | `object` | 接收到客户端的 **请求头** 对象                                                      |
| _[httpVersion](http://nodejs.cn/api/http.html#messagehttpversion)_     | `string` | 接收到客户端请求的 HTTP 版本                                                        |
| _[method](http://nodejs.cn/api/http.html#messagemethod)_               | `string` | 接收到客户端的请求方式，如 'GET'，'POST'                                            |
| _[statusCode](http://nodejs.cn/api/http.html#messagestatuscode)_       | `number` | 接收到客户端请求的 HTTP 响应状态码，如 404                                          |
| _[statusMessage](http://nodejs.cn/api/http.html#messagestatusmessage)_ | `string` | 接收到客户端请求的 HTTP 响应状态提示消息，如 'OK'，'Internal Server Error'          |
| _[url](http://nodejs.cn/api/http.html#messageurl)_                     | `string` | 接收到客户端请求的 **网址路径**，以 `/` 开头; 通常结合 _[url 模块](#url)_ 一起使用; |

### `http.ServerResponse`

> 该实例对象作为 `requestListener` 函数中的第二个参数，表示要发送(返回)给客户端的数据 **响应** 对象; 一般用 `response` 表示;

常用属性和方法如下，更多属性可查看 _[官方文档](http://nodejs.cn/api/http.html#class-httpserverresponse)_:

| 属性(方法)                                                                                                            | 描述                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| _[end(data, callback)](http://nodejs.cn/api/http.html#responseenddata-encoding-callback)_                             | 该方法会通知服务器，所有响应都已被发送，即表示完成响应，在每个响应中都 **必须** 要调用;<br />它的 `data` 参数只能传 `string` 或 `buffer(二进制)` 类型 |
| _[setHeader(name, value)](http://nodejs.cn/api/http.html#responsesetheadername-value)_                                | 单独设置响应头及其对应的内容                                                                                                                          |
| _[getHeader(name)](http://nodejs.cn/api/http.html#responsegetheadername)_                                             | 读取已排队但还未发送到客户端的指定的 **响应头**，其返回的值取决于 `response.setHeader()` 设置的值                                                     |
| _[hasHeader(name)](http://nodejs.cn/api/http.html#responsehasheadername)_                                             | 检测是否具有指定的响应头，返回 `boolean` 值; `name` 名称匹配不区分大小写                                                                              |
| _[statusCode](http://nodejs.cn/api/http.html#responsestatuscode)_                                                     | 设置发送到客户端的响应状态码                                                                                                                          |
| _[writeHead(statusCode, headers?)](http://nodejs.cn/api/http.html#responsewriteheadstatuscode-statusmessage-headers)_ | 向客户端的请求发送 **状态码** 和 **响应头**，它的优先级高于 `response.setHeader()` 内设置的值                                                         |
| _[setTimeout(msecs, callback?)](http://nodejs.cn/api/http.html#responsesettimeoutmsecs-callback)_                     | 设置响应的 **超时时间**                                                                                                                               |

### `http.get()` {#http-get}

- 由于大多数请求是没有正文的 `GET` 请求，所以该方法主要用来直接运行并 **发起** 一个 `GET` 请求，获取该请求地址中的响应数据;
- **参数**:

```ts
http.get(url: string, callback: (response: http.IncomingMessage) => void)

// url: 请求地址，通常是一个比较完整的地址路径
// callback: 处理该方法的回调函数，它的参数 response 表示响应对象
```

- 回调函数中的参数 `response` 中并不携带请求地址的响应体数据，如果要获取响应体数据，需要通过监听该参数的 `data` 和 `end` 事件来获取;
- 如果在回调中不使用响应数据，就必须要注意 **消费响应数据**，否则这些数据会占用内存，进而导致内存不足的错误;
- **用法示例**:

```js
const http = require('http');

http
  .get('http://www.baidu.com', (res) => {
    if (res.statusCode !== 200) {
      // 如果不想读取数据一定记得手动消费响应数据
      res.resume();
      return;
    }
    res.setEncoding('utf8'); // 为从 Readable 流读取的数据设置字符编码
    // 监听 data 和 end 事件，获取响应体数据
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      try {
        console.log(`响应主体: ${body}`);
        // 获取到响应体数据之后，就可以对这些数据做一些抓取或筛选(cheerio 模块)，或将其通过 fs 模块写入到其他文件
      } catch (error) {
        console.log('error: ', error.message);
      }
    });
  })
  .on('error', (err) => {
    console.log('err: ', err.message);
  });

const server = http.createServer();
server.listen(3333);
```

### `http.request()`

- 该方法同 [`http.get()`](#http-get) 方法的作用一样，都是 **发起** 一个请求，区别就是它还可以发起 `POST` 请求，可以配置更多的参数，返回一个 _[http.ClientRequest](http://nodejs.cn/api/http.html#class-httpclientrequest)_ 类的实例;
- **参数**:

```ts
http.request(url?: string, options?: Object, callback: (response: http.IncomingMessage) => void)

// url: 请求地址，通常是一个比较完整的地址路径（可省略）
// options: 配置请求的参数，包括地址，请求方式等，可以是一个对象，字符串或 URL 对象
// callback: 处理该方法的回调函数，它的参数 response 表示响应对象
```

- 参数 `options` 如果是一个 **字符串**，则表示为请求地址路径，会自动使用 url 模块中的 `new URL()` 进行解析;
- 参数 `options` 如果是一个 **URL 对象**，会自动转换为一个普通的 `options` 对象;
- 如果同时指定了 `url` 和 `options` 对象参数，则会将二者进行合并，且 `options` 中的属性优先;
- 使用该方法时，必须要始终调用 `http.request().end()` 方法来表示请求的 **结束**;
- 参数 `options` 中的常用属性如下，更多属性可查看 [_官方文档_](http://nodejs.cn/api/http.html#httprequesturl-options-callback)

| 属性(方法) | 类型     | 描述                                                |
| ---------- | -------- | --------------------------------------------------- |
| `host`     | `string` | 发起请求的服务器的域名，IP 地址，默认为 `localhost` |
| `hostname` | `string` | `host` 的别名，优先于 `host`                        |
| `port`     | `string` | 远程服务器的端口号，默认为 `80`                     |
| `path`     | `string` | 发起请求的路径，默认为 `/`                          |
| `method`   | `string` | 指定 HTTP 的请求方式，默认为 `GET`                  |
| `headers`  | `object` | 设置请求头                                          |

- **用法示例**:

```js
// 采用官方文档中的 示例
const http = require('http');
const server = http.createServer();

// POST 请求所需的参数，需是 JSON 字符串
const postData = JSON.stringify({
  msg: 'Hello World! 😄',
  date: '2022-03-29',
});

const options = {
  hostname: 'nodejs.cn',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http
  .request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);

    res.setEncoding('utf8');

    let body = '';
    res.on('data', (chunk) => {
      console.log('chunk: ', chunk);
      body += chunk;
    });
    res.on('end', () => {
      console.log(`响应主体: ${body}`);
    });
  })
  .on('error', (err) => {
    console.log('err: ', err.message);
  });

// 写入数据到请求主体（相当于在 POST 请求中，将定义好的 postData 作为参数传递出去）
req.write(postData);

// 结束请求（必须调用）
req.end();

server.listen(3333);
```

## fs 模块

## url 模块 {#url}

## 创建简易的 Web 服务

```js title="本地自定义一个 service.js 文件"
const http = require('http');
const server = http.createServer();
// 为服务器实例绑定 request 事件，监听客户端的请求
server
  .on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
    res.end('Hello World! 😄');
  })
  .listen(3333);
```

在命令行中通过 `node service` 运行以上代码后，然后在浏览器中输入 `127.0.0.1:3333` 即可访问到对应的内容;

## 连接 MySQL 数据库

### 下载 MySQL 数据库

[数据库下载](https://dev.mysql.com/downloads/mysql/)

## 相关链接
