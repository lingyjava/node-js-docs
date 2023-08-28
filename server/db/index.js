const mysql = require('mysql')
const db = mysql.createPool({
    // 数据库 ip 地址
    host: '127.0.0.1',
    // 账号
    user: 'root',
    // 密码
    password: '123456',
    // 库名
    database: 'user_ly'
})
module.exports = db