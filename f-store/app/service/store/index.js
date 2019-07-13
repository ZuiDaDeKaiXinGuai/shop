/*
 * 店铺业务逻辑
 */

const Service = require('egg').Service;
class StoreServices extends Service {
  async addShopCatagory(data){
    let {app} = this;
    if(data && data.cat_name && data.sub_cat_name) {
      let result = await app.mysql.insert('shop_catagory',data)
      return {
        data:result.affectedRows
      }
    }
    return {
      msg: 'params `cat_name,sub_cat_name` missing',
      data: null
    }
  }
  async allShopCatagory(){
    let {app} = this;

    let result = await app.mysql.select('shop_catagory')
      return {
        data:result
      }
  }
  async storeList(uid){
    let {app, ctx} = this;
    let {HPE} = ctx.helper;

    let [error,result] = uid ? await HPE(app.mysql.query(`select * from store where uid = ?`,uid)) : await HPE(app.mysql.query('select * from store'))
    return error?{error}:{result}
  }
  async getStoreById(sid){
    let {app, ctx} = this;
    let {HPE} = ctx.helper;

    let [error,result] = await HPE(app.mysql.query(`select * from store where store_id = ?`,sid))
    return error?{error}:{result}
  }
  async delStoreById(store_id){
    let {app, ctx} = this;
    let {HPE} = ctx.helper;

    let [error1,result1] = await HPE(app.mysql.delete(`store`,{store_id}))
    let [error2,result2] = await HPE(app.mysql.delete(`goods`,{store_id}))
    return error1||error2?{error:{error1,error2}}:{result:{delstore:result1.affectedRows,delgoods:result2.affectedRows}}
  }
  async createStore(params){
    let {app, ctx} = this;
    let {HPE} = ctx.helper;
    let [err,result] = await HPE(app.mysql.insert('store',{
      ...params,
      create_time:Date.now()
    }))
    return err? {error:err}:{row:result.affectedRows}
  }
  async decorateStore(params){
    let {app, ctx} = this;
    let {HPE} = ctx.helper;
    let {store_id} = params
    delete params.store_id;

    let [error,result] = await HPE(app.mysql.update('store',params,{
      where:{
        store_id
      }
    }))
    if(result.affectedRows==0){ error = {msg:`店铺不存在！`}}
    return error?{error}:{result}
  }
  async statistics(params){
    let {app, ctx} = this;
    let {HPE} = ctx.helper;
    let {store_id,date} = params
    
    let [error,result] = await HPE(
      app.mysql.select('order', { // 搜索 post 表
        where: { store_id,status:1 }, // WHERE 条件
        // columns: ['author', 'title'], // 要查询的表字段
        // orders: [['create_time','desc'], ['id','desc']], // 排序方式
        // limit: 10, // 返回数据量
        // offset: 0, // 数据偏移量
      })
    )
    if(result.affectedRows==0){ error = {msg:`店铺不存在！`}}
    return error?{error}:{result}
  }
}
module.exports = StoreServices;