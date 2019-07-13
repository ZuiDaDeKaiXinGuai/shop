/*
 * @Description: Have A Nice Day! 购物车
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-26 19:39:52
 * @LastEditTime: 2019-04-27 10:04:12
 */

const Service = require('egg').Service;
class CartServices extends Service {
    async checkgoods(goods_id) {
        const goods = await this.app.mysql.query('select * from goods where goods_id = ?', goods_id);
        return goods.length !== 0
    }
    async checkCart(uid,goods_id) {
        const goods = await this.app.mysql.select('cart', {where:{goods_id,uid}});
        return goods.length == 0
    }
    async list(uid) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let [error, result] = await HPE(app.mysql.query(`
        select cart.*, goods.serial_number, goods.goods_name,goods.store_id,goods.cat,goods.cat_id,goods.cart_image 
        from cart join goods on cart.goods_id = goods.goods_id where uid = ?`, uid));
        return error ? { error } : { result }
    }
    async add(params) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let ifGoodsExist = await this.checkgoods(params.goods_id);
        if (!ifGoodsExist) {
            return { error: "商品不存在！" }
        }
        let ifCartRepeat = await this.checkCart(params.uid,params.goods_id);
        if (!ifCartRepeat) {
            return { error: "商品已存在，请勿重复添加！" }
        }
        params.status = 0;
        params.create_time = Date.now();
        let [error, result] = await HPE(app.mysql.insert('cart', {
            ...params
        }))
        return error ? { error } : { result }
    }
    async edit(uid, goods_id, count) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let ifCartExist = await this.checkCart(uid,goods_id);
        if (ifCartExist) {
            return { error: "商品不存在！" }
        }
        let [error, result] = await HPE(app.mysql.update('cart', { count, update_time: Date.now() }, {
            where: {
                uid,
                goods_id
            }
        }))
        return error ? { error } : { result }
    }
    async delete(uid, goods_id) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let ifGoodsExist = await this.app.mysql.query('select * from cart where goods_id = ?', goods_id);
        if (ifGoodsExist.length == 0) {
            return { error: "商品不存在！" }
        }
        let [error, result] = await HPE(app.mysql.delete('cart', { uid, goods_id }))
        return error ? { error } : { result }
    }
}

module.exports = CartServices