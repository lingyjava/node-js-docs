# 4·http模块

- [4·http模块](#4http模块)
  - [http模块是什么](#http模块是什么)
  - [http模块的作用](#http模块的作用)
  - [创建基本的web服务器](#创建基本的web服务器)
    - [req请求对象](#req请求对象)
    - [res响应对象](#res响应对象)
  - [根据不同的url响应](#根据不同的url响应)
  - [关闭服务](#关闭服务)

## http模块是什么
http模块是Node.js官方提供的、用来创建web服务器的模块。通过http模块提供的`http.createServer()`方法，将能方便的把计算机变成一台服务器，对外提供Web资源服务。

想要使用http模块需要使用以下方式导入：
`const http = require('http')`

## http模块的作用
服务器和普通计算机的区别在于服务器上安装了web服务器软件，例如IIS、Apache等。
而在Node.js中，http模块就是服务器软件。通过http模块对外提供web服务。

## 创建基本的web服务器
基于http模块创建web服务器流程：
1. 导入http模块。
   `const http = require('http');`
2. 创建web服务器实例。
   `const server = http.createServer();`
3. 为服务器实例绑定request事件，监听客户端的请求。
   `server.on('request', (req, res) => {})`
4. 启动服务器。
   `server.listen(80, () => {})`

[示例代码](./../code/http.js)

### req请求对象
服务器接收到客户端请求时触发server的request事件，在事件处理函数中可以通过req参数访问与客户端相关的数据和属性。

req是请求对象，包含了与客户端相关的数据和属性，如：
- req.url ：客户端请求的URL
- req.method ：客户端请求的method类型

### res响应对象
服务器的request事件处理函数中可以通过res参数访问与服务器相关的数据和属性。

res是响应对象，包含了与服务器相关的数据和属性，如：
- res.end(str) : 向客户端响应指定的内容，并结束这次请求处理过程。
- res.setHeader() : 设置服务器响应头。
- 
为了防止中文乱码，可以设置响应头Content-Type的值为text/html; charset=utf-8
`res.setHeader('Content-Type', 'text/html; charset=utf-8')`

## 根据不同的url响应
根据不同的url去响应不同的内容实现步骤：
1. 获取请求的url地址。
2. 设置默认的响应内容为`404 NOT Found`.
3. 判断用户的请求是否为`/`或者`/index.html`首页。
4. 判断用户的请求是否为`/about.html`关于页面。
5. 设置Content-Type请求头。
6. 使用`res.end()`把内容响应给客户端。

[示例代码](./../code/http.js)

## 关闭服务
当关闭进程时，进程会收到一个信号。这些信号有许多种类，在这里我们主要关心下面三种。
- SIGINT: 来自键盘 Ctrl + C 的组合（中断进程）
- SIGQUIT: 来自键盘 Ctrl + \（关闭进程）这个操作同时也会生成一个 core 文件
- SIGTERM: 通过系统操作退出(例如使用 kill 命令)
- 
当进程收到这些信号时，Node.js 会触发事件。因此我们就可以对这些事件编写对应的方法。在下面这个例子中我们将关闭服务器，它会处理完那些被挂起的请求并且不会再接受新的请求。

[示例代码](./../code/http.js)

