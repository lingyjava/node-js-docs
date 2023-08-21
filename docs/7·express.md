# 7·express



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

中间件（Middleware ），特指业务流程的中间处理环节。
