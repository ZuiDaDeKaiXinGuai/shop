/*
 * @Description: 商品SKU设置
 * @Author: shaoshan.ding
 * @LastEditors: Jacky
 * @Date: 2019-04-17 15:51:12
 * @LastEditTime: 2019-04-23 16:48:32
 */
const Service = require('egg').Service;
class SkuServices extends Service {
    async get(params) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let {store_id, cat_id} = params
        let [error, result] = await HPE(app.mysql.select('sku_cat', {
            columns: ['sku_json_tpl'],
            where:{ store_id, cat_id }
        }));
        if(result.length==0){
            return {result:null,message:"无数据"}
        }
        return error ? { error } : { result:result[0] }
        
    }
    async set(params) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let { store_id, cat_id, sku } = params;
        let {result} = await this.get({store_id, cat_id});

        if(result&&result.sku_json_tpl!=''&&result.sku_json_tpl!=null){
            return {result:{message:"sku已存在，如果要更新请先删除再重新设置。",sku_json_tpl:result.sku_json_tpl}}
        }
        
        let [error, result1] = await HPE(app.mysql.update('sku_cat', { sku_json_tpl: sku }, {
            where: { store_id, cat_id }
        }))
        
        return error ? { error } : { result:result1 }
    }
    async del(params) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let { store_id, cat_id } = params
        let [error, result] = await HPE(app.mysql.update('sku_cat', { sku_json_tpl: '' }, {
            where: { store_id, cat_id }
        }))
        
        return error ? { error } : { result }
    }
}

module.exports = SkuServices

