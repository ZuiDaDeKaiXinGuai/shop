import request from '../utils/request'

//获取店铺信息
function getStoreinfo(params){
    return request.get('/store/goods/goodslist',{query:params})
}
//获取店铺列表数据
function getHomeList(params={}){
return request.get('/buyer/homelist',{query:params})
}
//添加购物车
function addShopcar(params){
    return request.post('/buyer/cart/add',{body:params})
}
//买家登录
function userLogin(params){
    return request.post('/buyer/user/login',{body:params})
}
//买家注册
function userRegister(params){
    return request.post('/buyer/user/register',{body:params})
}
//获取验证码
function getCapcha(params={}){
    return request.get('/buyer/user/captcha')
}
export {
    getStoreinfo,
    getHomeList,
    addShopcar,
    userLogin,
    userRegister,
    getCapcha
}