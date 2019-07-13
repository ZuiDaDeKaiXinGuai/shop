/*
 * @Description: Have A Nice Day! 买家用户信息管理
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-26 16:39:33
 * @LastEditTime: 2019-04-27 09:42:33
 */

const Service = require('egg').Service;
class CatagoryServices extends Service {
    async register(params) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        
        params.create_date = Date.now()
        
        let [error0, result0] = await HPE(app.mysql.select('buyer',{where:{buyer_name:params.buyer_name}}));
        if(result0.length>0){
            return {error:'用户名不可重复。'}
        }
        
        let [error, result] = await HPE(app.mysql.insert('buyer',params));

        return  { error , result }
    }
    async login(buyer_name, buyer_pwd) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        
        let [error, [result]] = await HPE(app.mysql.select('buyer',{where:{buyer_name,buyer_pwd}}));

        return  { error , result }
    }
    async addStoreCollect(uid, store_id) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        
        let [error0, result0] = await HPE(app.mysql.select('buyer',{where:{uid},columns:['store_collect']}));
        if(result0[0].store_collect.indexOf(store_id)>-1){
            return {result:"店铺已收藏"}
        }
        let [error, result] = await HPE(app.mysql.update('buyer',{
            store_collect: result0[0].store_collect+store_id+','
        },{where:{uid}}));

        return  { error , result }
    }
    async removeStoreCollect(uid, store_id) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        
        let [error0, result0] = await HPE(app.mysql.select('buyer',{where:{uid},columns:['store_collect']}));
        let [error, result] = await HPE(app.mysql.update('buyer',{
            store_collect: result0[0].store_collect.replace(store_id+',','')
        },{where:{uid}}));

        return  { error , result }
    }
}

module.exports = CatagoryServices