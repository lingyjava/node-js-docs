// 导入 express
const express = require('express')
// 导入 path
const path = require('path')

// 创建 web 服务器
const app = express()

// 配置解析 application/json 格式的内置中间件
// app.use(express.json())
// 配置解析 application/x-www-form-urlencoded 格式的内置中间件
// app.use(express.urlencoded({extended: false}))

// 监听端口，启动成功回调函数
app.listen(80, () => {
    console.log('listen 80')
})

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
// 挂载全局中间件
// app.use(mw)


// 导入解析 querystring 的内置模块
const qs = require('querystring')
// 自定义中间件
const bodyParse = function (req, res, next) {  
    let str = ''

    // 监听 req 的 data 事件，发送请求体数据触发
    req.on('data', (chunk) => {  
        // 拼接请求参数，转换为字符串
        str += chunk
    })
    // 监听 end 事件，请求体发送完毕时触发
    req.on('end', () => {
        // 解析参数为对象格式
        const body = qs.parse(str)
        // 挂载到 req.body
        req.body = body
        // 执行完毕，向下传递
        next()
    })
}
app.use(bodyParse)
// 单独一个文件时，作为自定义模块向外共享，在其他模块中导入并通过app.use()使用
// module.exports = bodyParse;

// 监听 get 请求
app.get('/hello', function (req, res) {
    console.log('/hello 请求')
    // 获取查询参数

    // 通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数
    console.log(req.query)
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

// ******************************* 托管静态资源
// 通过express.static()，可以方便地创建一个静态资源服务器，将 static 目录下的文件对外开放访问，在指定的静态目录中查找文件，存放静态文件的目录名不会出现在 URL 中
// 如果要托管多个静态资源目录，请多次调用 express.static() 函数
app.use(express.static(path.join(__dirname, '../static')))

// 挂载路径前缀
app.use('/static', express.static(path.join(__dirname, '../static')))

// 导入并挂载路由模块
const userRouter = require('./userRouter')
app.use(userRouter)
app.use('/api', userRouter)

// 定义局部中间件
app.get('/helloV2', mw, function (req, res) {
    // 响应数据
    res.send('hello world')
})
// 定义多个局部中间件
app.get('/helloV3', mw, mw1, function (req, res) {res.send('hello world')})
app.get('/helloV4', [mw, mw1], function (req, res) {res.send('hello world')})


// ************************** 错误中间件 start
// 抛出错误
app.get('/helloV5', function (req, res) {  
    console.log('发生错误')
    throw new Error('发生错误')
})
// 错误级别中间件，捕获错误
app.use(function (err, req, res, next) {  
    console.log('发生错误')
    res.send('err:' + err.message)
})