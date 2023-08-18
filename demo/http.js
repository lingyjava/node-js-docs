// node http.js

// 1. 导入http模块
const http = require('http');
// 引入模块
const fs = require('fs')
const path = require('path')

// 2. 创建一个web服务实例
const server = http.createServer();

// 3. 绑定请求事件
server.on('request', (req, res) => {
    // 处理请求函数
    console.log('收到请求');

    const url = req.url;
    let fpath = ''
    
    if (url === '/') {
        fpath = path.join(__dirname, '../static/index.html')
    } else {
        fpath = path.join(__dirname, '../static', url)
    }
    console.log(fpath)

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) {
            return res.end('404 NOT FOUNT')
        }
        res.end(dataStr)
    })
})

// 4. 启动服务, 监听端口
server.listen(80, () => {
    // 回调函数
    console.log('启动成功');
    console.log('pid is ' + process.pid);
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