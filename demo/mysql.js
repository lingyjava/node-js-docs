// 导入 Mysql
const mysql = require('mysql')
// 建立数据库连接池
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

// 查询
db.query('select * from user_member', (err, results) => {
    if (err) {
        console.log(err.message)
        return ;
    }
    console.log(results)
})

// 插入
const userMember = {
    userLoginName: 'ly',
    password: '123456',
    salt: 'abcdefg'
}
const insertSqlStr = 'insert into user_member(user_login_name, password, salt) values (?, ?, ?)'
// 使用数组形式为 ? 占位符赋值
db.query(insertSqlStr, [userMember.userLoginName, userMember.password, userMember.salt], (err, results) => {
    if (err) {
        return console.log(err.message)
    }
    console.log(results)
})

// 全字段插入
const insertAllSqlStr = 'insert into user_member SET ?'
// 使用对象作为占位符的值，对象属性应与表字段对应
db.query(insertAllSqlStr, userMember, (err, results) => {
    // ...
})

// 修改
const userMember2 = {
    id: 5,
    userLoginName: 'ly',
    password: '456798',
    salt: 'abcdefg'
}
const updateSqlStr = 'update user_member set ?  where id = ?'
db.query(updateSqlStr, userMember2, (err, results) => {
    if (err) {
        console.log(err.message)
    }
    return results
})

// 删除
const deleteSqlStr = 'delete from user_member where id = ?'
db.query(deleteSqlStr, 5, (err, results) => {
    if (err) {
        console.log(err.message)
    }
    return results
})
