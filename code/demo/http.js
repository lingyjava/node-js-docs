// node http.js

// 1. 导入http模块
const http = require('http');

// 2. 创建一个web服务实例
const server = http.createServer();

// 3. 绑定请求事件
server.on('request', (req, res) => {
    // 处理请求函数
    console.log('收到请求');

    const url = req.url;
    let content = '<h1>404 NOT Found!</h1>'
    
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>';
    } else if (url === '/about.html') {
        content = '<h1>关于页面</h1>';
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(content);
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