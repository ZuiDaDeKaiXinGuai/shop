/*
 * @Description: 添加商品分类
 * @Author: shaoshan.ding
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-17 15:51:12
 * @LastEditTime: 2019-04-17 17:08:36
 */
const Service = require('egg').Service;
class CatagoryServices extends Service {
    async list(store_id,cat_id) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let queryparams = cat_id?{
            store_id,
            cat_id
        }:{store_id}

        let [error, result] = await HPE(app.mysql.select('sku_cat',{where:queryparams}));

        return error ? { error } : { result }
    }
    async add(params) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let [error, result] = await HPE(app.mysql.insert('sku_cat', {
            ...params
        }))
        return error ? { error } : { result }
    }
    async edit(cat_name,cat_id) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let [error, result] = await HPE(app.mysql.update('sku_cat',{cat_name}, {
            where:{
                cat_id
            }
        }))
        return error ? { error } : { result }
    }
    async delete(cat_id) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let [error, result] = await HPE(app.mysql.delete('sku_cat',{cat_id}))
        return error ? { error } : { result }
    }
}

module.exports = CatagoryServices