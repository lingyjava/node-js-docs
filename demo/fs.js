// node ./fs.js

// 导入fs
const fs = require('fs');
const { dirname } = require('path');

fs.readFile(__dirname + '/../file/fileTest.txt', 'utf-8', function(err, dataStr){
    if (err) {
        // 读取失败
        console.log(err);
        return;
    }  
    // 读取成功
    console.log(dataStr);
});

fs.writeFile(__dirname + '/../file/fileWrite.txt', 'Hello fs', 'utf8', function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('成功');
})


// 案例1

// 当前目录名 D:\workspace\node-js-study-docs\code
console.log(__dirname);
fs.readFile(__dirname + '/../file/成绩min.txt', 'utf8', function(err, dataStr) {
    if (err) {
        console.log('读取文件失败' + err);
        return;
    }

    const arr = dataStr.split(',');
    const targetArr = [];

    arr.forEach(item => {
        targetArr.push(item.replace("-", ":"));
    })

    const target = targetArr.join('\n');

    fs.writeFile(__dirname + '/../file/成绩.txt', target, 'utf8', function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('成功');
    })
})