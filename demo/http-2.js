// 引入模块
const http = require('http')
const fs = require('fs')
const path = require('path')

// web 服务
const server = http.createServer()
// 绑定请求事件
server.on('request', function(req, res) {

    const url = req.url
    let fpath = ''

    if (url === '/') {
        fpath = path.join(__dirname, '../static/index.html')
    } else {
        fpath = path.join(__dirname, '../static', url)
    }

    console.log(fpath)

    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) {
            return res.end('404 NOT FOUNT')
        }
        res.end(dataStr)
    })

})
// 监听80端口
server.listen(80, function(req, res) {
    console.log('server start, listen 127.0.0.1:80')
})


function handlerExit() {
    server.close(() => {
        console.log('服务已关闭');
        process.exit(0);
    });
}

// 监听关闭服务事件
process.on('SIGINT', handlerExit);
process.on('SIGQUIT', handlerExit);
process.on('SIGTERM', handlerExit);