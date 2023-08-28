const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 生成 Token 字符串
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports.regUser = (req, res) => {
    // 获取表单数据
    const userinfo = req.body
    if (!userinfo.userLoginName || !userinfo.password) {
        return res.send('登录名和密码不能为空')
    }
    // 校验用户名是否已存在
    const sql = 'select * from user_member where user_login_name = ?'
    db.query(sql, userinfo.userLoginName, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc('用户名称已占用')
        }

        // 密码加密
        // npm i bcryptjs@2.4.3
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串， bcrypt.hashSync(明文密码, 随机盐的长度)
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const insertSql = 'insert into user_member (user_login_name, password) values (?, ?)'
        db.query(insertSql, [userinfo.userLoginName, userinfo.password], (err, results) => {
            if (err) {
                return res.send(err.message)
            }
            if (results.affectedRows > 0) {
                return res.send('reg success')
            }
        })
    })
}

module.exports.login = (req, res) => {
    // 获取表单数据
    const userinfo = req.body
    if (!userinfo.userLoginName || !userinfo.password) {
        return res.send('登录名和密码不能为空')
    }
    const sql = 'select * from user_member where user_login_name = ?'
    db.query(sql, userinfo.userLoginName, (err, results) => {
        if (err) {
            return res.send(err.message)
        }
        if (results.length < 1) {
            return res.send('用户不存在')
        }
        // bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
        if(bcrypt.compareSync(userinfo.password, results[0].password)) {
            // 登录成功
    
            // 去除用户敏感信息 , ES6 高级语法
            const user = { ...results[0], password: '', salt: '' }
            // 生成 token 
            const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                // token 有效期为 10 个小时
                expiresIn: '10h', 
            })
            res.send({
                status: 0,
                message: '登录成功！',
                // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
                token: 'Bearer ' + tokenStr,
            })
        } else {
            res.cc('用户名或密码错误')
        }
        
    })
}


