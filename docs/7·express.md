# 7·express

- [7·express](#7express)
  - [what’s this](#whats-this)
  - [安装](#安装)
  - [基本使用](#基本使用)
  - [托管静态资源](#托管静态资源)
  - [nodemon](#nodemon)
  - [Express路由](#express路由)
    - [挂载到app](#挂载到app)
    - [模块化路由](#模块化路由)
  - [中间件](#中间件)
    - [全局中间件](#全局中间件)
    - [局部中间件](#局部中间件)
    - [注意事项](#注意事项)
    - [中间件分类](#中间件分类)
    - [自定义中间件](#自定义中间件)
  - [相关代码](#相关代码)
  - [跨域资源共享](#跨域资源共享)
    - [cors 中间件](#cors-中间件)
    - [响应头](#响应头)


## what’s this

[Express]((https://www.expressjs.com.cn/)) 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架（第三方包），是基于内置的 http 模块进行封装，用来创建 Web 服务器。

使用 Express，可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器。

- Web 网站服务器：对外提供 Web 网页资源的服务器。
-  API 接口服务器：对外提供 API 接口的服务器。

## 安装

`npm i express`

## 基本使用

```javascript
// 创建 web 服务器
const app = express()

// 监听端口，启动成功回调函数
app.listen(80, () => {
    console.log('listen 80')
})

// 监听 get 请求
app.get('/hello', function (req, res) {
    console.log('/hello 请求')
    // 获取查询参数

    // 通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数
    console.log(req.query)
    // 通过 req.query 对象获取对应字段
    console.log(req.query.name)
    // 通过 req.params 对象，可以访问到 URL 中，通过 : 匹配到的动态参数
    console.log(req.params)

    // 响应数据
    res.send('hello')
})


// 监听 post 请求
app.post('/user', function (req, res) {
    console.log('/user 请求')
    res.send({name: 'ly', age: 18})
})
```

## 托管静态资源

通过 `express.static()`，可以方便地创建一个静态资源服务器，将选择的目录下的文件对外开放访问，在指定的静态目录中查找文件，存放静态文件的目录名不会出现在 URL 中。

如果要托管多个静态资源目录，请多次调用 `express.static()` 函数。

example：`app.use(express.static(path.join(__dirname, '../static')))`

通过 http://127.0.0.1/index.html 访问。

---

**挂载路径前缀**：在托管的静态资源访问路径之前，挂载路径前缀。

example：`app.use('/static', express.static(path.join(__dirname, '../static')))`

通过 http://127.0.0.1/static/index.html 访问。

## nodemon

[nodemon](https://www.npmjs.com/package/nodemon) 工具，能够监听项目文件的变动，当代码被修改后自动重启项目，方便开发调试。

可将 nodemon 安装为全局可用的工具：`npm install -g nodemon`

使用 `nodemon app.js` 代替 `node app.js` 命令即可使用。

## Express路由

在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

每当一个请求到达服务器之后，需要经过路由匹配成功之后，才会调用对应的处理函数。 在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。

### 挂载到app

路由挂载最简单的方式。

```js
app.post('/user', (req, res) => {
    res.send({name: 'ly', age: 18})
})
```

### 模块化路由

Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块，方便对路由进行模块化的管理。

将路由抽离为单独模块：

1. 创建路由模块对应的 .js 文件。
2. 调用 express.Router() 函数创建路由对象。
3. 向路由对象上挂载具体的路由。
4. 使用 module.exports 向外共享路由对象。
5. 使用 app.use() 函数注册路由模块。

---

**userRouter.js**

```js
// 模块化抽取的 user 路由模块

const express = require('express')
// 创建路由对象
const route = express.Router()

// 挂载路由
route.get('/user/list', function (req, res) { 
    res.send([
        {
            name: 'ly',
            age: 18
        },
        {
            name: 'lc',
            age: 22
        }
    ])
})

// 共享路由对象
module.exports = route
```

**express.js**

```js
// 导入并挂载路由模块
const userRouter = require('./userRouter')
app.use(userRouter)
// 增加统一前缀
app.use('/api', userRouter)
```

## 中间件

中间件（Middleware ），特指业务流程的中间处理环节。当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

本质上就是一个 function 处理函数，中间件函数的形参列表中，必须包含 next 参数（一个函数）。next 函数实现多个中间件连续调用，表示把流转关系转交给下一个中间件或路由。

`app.get('/', function(req, res, next))`

---

多个中间件之间，共享同一份 req 和 res。可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法（如：`req.a = 10`），供下游的中间件或路由进行使用。

### 全局中间件

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。

通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件。

```js
// create 中间件函数
const mw = function (req, res, next) {  
    console.log('简单中间件处理')
    // 处理完成后，调用 next ，交给下一个中间件
    next()
}
// 挂载全局中间件
app.use(mw)
```

使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用。

### 局部中间件

不使用 app.use() 定义中间件，在路由挂载时定义的，叫做局部生效的中间件。

```js
// create 中间件函数
const mw = function (req, res, next) {  
    console.log('简单中间件处理')
    // 处理完成后，调用 next ，交给下一个中间件
    next()
}
const mw1 = function (req, res, next) {  
    console.log('简单中间件处理1')
    // 处理完成后，调用 next ，交给下一个中间件
    next()
}

// 定义局部中间件, mw 函数仅在此路由生效
app.get('/helloV2', mw, function (req, res) {	})

// 定义多个局部中间件
app.get('/helloV3', mw, mw1, function (req, res) {res.send('hello world')})
app.get('/helloV4', [mw, mw1], function (req, res) {res.send('hello world')})
```

### 注意事项

- 一定要在路由之前注册中间件，否则不生效。
- 中间件结尾务必调用 next() 函数，调用 next() 函数后不再写代码。
- 多个中间件之间，共享 req 和 res 对象。

### 中间件分类

Express 官方把常见的中间件用法，分成 5 大类。

---

1. **应用级别中间件**

通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件。包括全局中间件和局部中间件。

---

2. 路由级别中间件

绑定到 express.Router() 实例上的中间件，用法和应用级别中间件没有任何区别。

---

3. 错误级别中间件

用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

**错误级别的中间件， 必须注册在所有路由之后！**

错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)

```js
// 抛出错误
app.get('/helloV5', function (req, res) {  
    throw new Error('发生错误')
})
// 错误级别中间件，捕获错误
app.use(function (err, req, res, next) {  
    console.log('发生错误')
    res.send('err:' + err.message)
})
```

---

4. Express内置中间件

   Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验。

   express.static 快速托管静态资源的内置中间件。

   express.json 解析 JSON 格式的请求体数据。

   express.urlencoded 解析 URL-encoded 格式的请求体数据。

```javascript
// 配置解析 application/json 格式的内置中间件
app.use(express.json())
// 配置解析 application/x-www-form-urlencoded 格式的内置中间件
app.use(express.urlencoded({extended: false}))
```

---

5. 第三方的中间件

非 Express 官方内置的，而是由第三方开发出来的中间件。

在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。

Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的

使用步骤：

1. 使用 `npm install body-parser` 命令安装中间件。
2. 使用 `require` 导入中间件。
3. 调用 `app.use()` 注册并使用中间件。

### 自定义中间件

实现步骤：

1. 定义中间件。
2. 监听 req 的 data 事件。
3. 监听 req 的 end 事件。
4. 使用 querystring 模块解析请求体数据。
5. 将解析出来的数据对象挂载为 req.body。
6. 将自定义中间件封装为模块。

## 相关代码

[express 使用示例](../demo/express.js)

[router 使用实例](../demo/userRouter.js)

## 跨域资源共享

CORS （Cross-Origin Resource Sharing，跨域资源共享）

浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头， 就可以解除浏览器端的跨域访问限制。

解决接口跨域问题的方案主要有两种：

- CORS（主流的解决方案，推荐使用）
-  JSONP（有缺陷的解决方案：只支持 GET 请求）

### cors 中间件

Express 的第三方中间件 cors 可以很方便地解决跨域问题。

使用步骤：

1. 运行 `npm install cors` 安装中间件。
2. 使用 `const cors = require('cors')` 导入中间件。
3. 在路由之前调用 `app.use(cors())` 配置中间件。

---

注意事项：

- CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置。
- CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器（IE10+、Chrome4+、FireFox3.5+），才能正常访问。

### 响应头

**Access-Control-Allow-Origin** 

`Access-Control-Allow-Origin: <origin> | *`

- origin 参数的值指定了允许访问该资源的外域 URL.

- 通配符 *，表示允许来自任何域的请求

---

**Access-Control-Allow-Headers**

默认情况下仅支持发送如下 9 个请求头： 

- Accept

- Accept-Language

- Content-Language

- DPR

- Downlink

- Save-Data

- Viewport-Width

- Width 

- Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded）



如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败。
