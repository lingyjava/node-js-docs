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