/*
 * @Description: 添加商品
 * @Author: shaoshan.ding
 * @LastEditors: Jacky
 * @Date: 2019-04-16 10:50:25
 * @LastEditTime: 2019-04-22 11:26:46
 */
let goodsprops = [`serial_number`,
`goods_id`,
`store_id`,
`goods_name`,
`cat`,
`cat_id`,
`status`,
`price`,
`market_price`,
`cost_price`,
`code_bar`,
`sold_count`,
`image`,
`cart_image`,
`type`,
`sku`,
`detail`,
`create_time`,
`update_time`,]
const Service = require('egg').Service;
class StoreServices extends Service {
    async createGoods(params) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let [error, result] = await HPE(app.mysql.insert('goods', {
            ...params
        }))
        return error ? { error } : { result }
    }
    async editGoods(goods_id, params) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        
        let [error, {affectedRows}] = await HPE(app.mysql.update('goods', params, {
            where:{
                goods_id
            }
        }))
        if(affectedRows==0){
            error = {
                info:"不存在此商品",
                goods_id
            }
        }
        return error ? { error } : { result:goods_id }
    }
    async delGoodsById(goods_id){
        let {app, ctx} = this;
        let {HPE} = ctx.helper;
    
        let [error,result] = await HPE(app.mysql.delete(`goods`,{goods_id}))
        return {error,result}
      }
    async getTotalGoodsList() {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let [error, result] = await HPE(app.mysql.select('goods'))
        return error ? { error } : { result }
    }
    async getGoodsListByStore(store_id) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let [error, result] = await HPE(app.mysql.select('goods', {
            where:{
                store_id
            }
        }))
        
        return error ? { error } : { result }
    }
    async getGoodsListByType(type,page,size,store_id) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;

        let queryData = {
            where: { status:1, type,store_id },
            columns: [
                `serial_number`,
                `goods_id`,
                `goods_name`,
                `price`,
                `market_price`,
                `code_bar`,
                `cart_image`,
                `create_time`,
                `update_time`,
                `store_id`
            ], // get the value of certain columns
            orders: [['sold_count','desc']], // sort order
            limit: size, // limit the return rows
            offset: (page-1)*size
        }

        let [error, result] = await HPE(app.mysql.select('goods',queryData))
        
        return error ? { error } : { result }   
    }
    async getGoodsDetail(goods_id) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let [error, result] = await HPE(app.mysql.select('goods', {where:{goods_id},columns: [
            `serial_number`,
            `goods_id`,
            `store_id`,
            `goods_name`,
            `cat`,
            `cat_id`,
            `price`,
            `market_price`,
            `code_bar`,
            `sold_count`,
            `image`,
            `cart_image`,
            `type`,
            `sku`,
            `detail`,
            `create_time`,
            `update_time`,
        ]}))
        
        return error ? { error } : { result }   
    }
    async getStoreList(){
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let queryData = {
            columns: [
                `store_id`,
                `store_name`,
                `brand_name`,
                `catagory`,
                `sub_catagory`,
                `logo`
            ], // get the value of certain columns
            orders: [['catagory','desc']], // sort order
            // limit: size, 
            // offset: (page-1)*size
        }
        let [error, result] = await HPE(app.mysql.select('store',queryData))
        return error ? { error } : { result }
    }
}

module.exports = StoreServices