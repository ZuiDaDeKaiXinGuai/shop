const path = require('path');
function ge(arr=[]){
  return arr.map(item=>{
    let [method,url] = item.split(' ');
    return {
      url,
      method:method.toUpperCase()
    }
  })
}

exports.keys = 'Jacky';
exports.security = {
  csrf: {
    enable: false
  },
}
exports.whiteList = ge([
  'post /store/login',
  'post /store/register'
])
exports.limitedList = ge([
  'post /store/decorate',
  'delete /store/delete'
])
exports.mysql = {
  client: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123321',
    database: 'store_shop'
  }
}
exports.storeBannerDirname = path.join(__dirname, '../assets/store_banner'); // 存储店铺banner图的目录
exports.storeUploadImage = path.join(__dirname, '../app/public/assets/upload'); // 存储店铺logo等图的目录
exports.static = {
  prefix: '/public/'
}
exports.multipart = {
  mode: 'file',
  fileSize: '200kb',
}
exports.middleware=[ 'errorHandler', 'checkIdentity' ]