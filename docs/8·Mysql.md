# 8·MySQL

- [8·MySQL](#8mysql)
  - [安装](#安装)
  - [配置](#配置)
  - [CRUD操作](#crud操作)


## 安装

mysql 模块是托管于 npm 上的第三方模块。提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。

运行如下命令 `npm install mysql`，将 mysql 安装为项目的依赖包。

## 配置

在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置。

```js
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
```

连接可能出现失败：ER_NOT_SUPPORTED_AUTH_MODE

因为 MySQL8.0 更换了新的密码验证方式，node客户端不支持新的验证方式。

解决方案：

1. 在 MySQL 中运行脚本降级密码验证。

	```javascript
	alter user 'root'@'localhost' identified with mysql_native_password by '自定义密码';
	flush privileges;
	```

2. 使用新版 mysql 连接器，可能有些方法发生了变动。

	```sh
	npm un mysql && npm i mysql2
	```

	```javascript
	// 导入myslq模块
	const mysql = require('mysql2')
	```

## CRUD操作

```js
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
```

