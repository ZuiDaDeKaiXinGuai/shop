/*
 * 根据storeid查询是否存在有效店铺
 */

const Service = require('egg').Service;
class StoreServices extends Service {
  async checkStore(storeid){
    const store = await this.app.mysql.query('select * from store where store_id = ?', storeid);
    return store.length!==0
  }
  async checkBuyer(uid){
    const buyer = await this.app.mysql.select('buyer', {where:{uid}});
    return buyer.length!==0
  }
  
}
module.exports = StoreServices;