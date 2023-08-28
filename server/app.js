const express = require('express')
const app = express()
const path = require('path')
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')

app.listen(80, () => {
    console.log('start success')
})

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: false
}))

// 处理返回值中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({  
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 配置解析 token 中间件
app.use(expressJWT({
    // 加密使用的密钥
    secret: config.jwtSecretKey, 
    // 算法
    algorithms: ["HS256"]
}).unless({
    // 忽略的请求路径
    path: [
        '/reguser',
        {url: '/login', methods: ['POST']}
    ]
}))
    

const userRouter = require('./router/user')
app.use(userRouter)


app.use(express.static(path.join(__dirname, '../static')))


app.get('/hello', (req, res) => {
    console.log('hello world')
    res.send('hello world')
})


// 错误中间件
app.use(function (err, req, res, next) {
    // 省略其它代码...
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误...
    return res.cc(err)
    next()
})
    