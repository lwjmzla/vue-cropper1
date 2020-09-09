const mime = require('mime');
const img = 'xxxx.zip'
console.log(mime.getType(img)) // 得到mime类型
console.log(mime.getExtension(mime.getType(img))) // 根据mime类型得到 文件扩展名（即后缀）