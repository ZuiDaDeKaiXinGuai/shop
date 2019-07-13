import request from '../utils/request'

//类别统计
function catCount(params) {
    return request.post('/store/statistics/catcount', { query: params })
}
//创建商铺
function createStore(params) {
    return request.post('/store/create', { body: params })
}
//我的店铺信息
function mystore(params={},headers) {
    return request.get("/store/ustorelist",{query:params,headers})
}
//店铺列表
function storeList() {
     return request.get('/store/storelist')
}
//店铺订单列表
function storeOrderList(params) {
    return request.post('/store/order/list', { body: params })
}

//注册商家
function registered(params) {
    return request.post('/store/register', { body: params })
}

//商品列表
function goodsList(params,headers){
    return request.post('/store/goods/list',{body:params,headers})
}
//卖家登陆
function login(params){
    return request.post('/store/login',{body:params})
}
//添加分类
function addType(params,headers){
    return request.put('/store/goods/cat.add',{body:params,headers})
}
//分类列表
 function typesList(params,headers){
     return request.post('/store/goods/cat.list',{body:params,headers})
 }
 //删除分类
 function delType(params,headers){
     return request.delete('/store/goods/cat.delete',{body:params,headers})
 }
 //店铺设置
 function setStore(params,headers){
     return request.post('/store/decorate',{body:params,headers})
 }
 //所有商品
//  function goodsList(params,headers){
//      return request.get('/store/goods/totallist')
//  }
export {
    catCount,
    createStore,
    storeList,
    storeOrderList,
    registered,
    login,
    goodsList,
    mystore,
    addType,
    typesList,
    delType,
    setStore
}