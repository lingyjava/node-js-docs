const express = require('express')
const app = express()

// 监听端口，启动成功回调函数
app.listen(80, () => {
    console.log('listen 80')
})
// 传统服务端渲染模式接口
app.get('/index.html', (req, res) => {
    const user = {
        name: 'ly', 
        age: 22
    }
    const html = `<h1>姓名：${user.name}，年龄：${user.age}</h1>`
    res.send(html)
})

// 开启 session
var session = require('express-session')
app.use(session({
    // 值可以为任意字符串
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// get / set data

// 用户登录
app.get('/login', (req, res) => {
    if (req.query.username != 'admin' && req.query.password != 'tiger') {
        return 'username or password error'
    }
    // 保存用户信息到 session
    req.session.user = req.query
    // 将登录状态存到 session
    req.session.token = 'mockToken'
    res.send('login success')
})

app.get('/hello', (req, res) => {
    if (req.session.token != 'mockToken') {
        res.send('Please login')
        return
    }
    // 获取 session 数据
    res.send(`hello,${req.session.user.username}`)
})

app.get('/logout', (req, res) => {
    // 清空当前客户端 session
    req.session.destroy()
    res.send('logout success')
})
 
// JWT 实现
const jsonwebtoken = require('jsonwebtoken')
const expressJWT = require('express-jwt')
// 密钥
const secretKey = 'siyao'
app.use(expressJWT({
    // 加密使用的密钥
    secret: secretKey, 
    // 算法
    algorithms: ["HS256"]
}).unless({
    // 忽略的请求路径
    path: [
        '/jwt/login',
        {url: '/login', methods: ['GET']}
    ]
}))


app.get('/jwt/login', (req, res) => {
    if (req.query.username != 'admin' && req.query.password != 'tiger') {
        return 'username or password error'
    }
    res.send({
        token: jsonwebtoken.sign({
            username: req.query.username,
            password: req.query.password
        }, secretKey, 
        // 过期时间
        {expiresIn: '30s'})
    })
})


app.get('/jwt/hello', (req, res) => {
    res.send(`hello,${req.user.username}`)
})

// 统一异常处理
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // token 解析失败
        return res.send('invalid token')
    }
    // 其他错误
    res.send(err.message)
})