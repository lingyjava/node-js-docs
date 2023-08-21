// 导入 express
const express = require('express')
// 导入 path
const path = require('path')

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

// 托管静态资源
// 通过express.static()，可以方便地创建一个静态资源服务器，将 static 目录下的文件对外开放访问，在指定的静态目录中查找文件，存放静态文件的目录名不会出现在 URL 中
// 如果要托管多个静态资源目录，请多次调用 express.static() 函数
app.use(express.static(path.join(__dirname, '../static')))

// 挂载路径前缀
app.use('/static', express.static(path.join(__dirname, '../static')))

// 导入并挂载路由模块
const userRouter = require('./userRouter')
app.use(userRouter)
app.use('/api', userRouter)