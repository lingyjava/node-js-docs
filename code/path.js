// node path.js

// 导入path对象
const path = require('path');

const testUrl = path.join('/a', '/b/c', '../', './d', 'e');
// ../ 将返回上一层目录，所以testUrl为 \a\b\d\e
console.log(testUrl); 

const url = path.join(__dirname, '../file/', '/fileWrite.txt');
console.log(url);

console.log(path.basename(url));
console.log(path.extname(url));

const fileName = path.basename(url, path.extname(url));
console.log(fileName);

