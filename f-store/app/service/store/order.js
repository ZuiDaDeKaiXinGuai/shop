/*
 * @Description: Have A Nice Day! 订单管理
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-29 17:39:58
 * @LastEditTime: 2019-04-30 11:28:40
 */


const Service = require('egg').Service;
class OrderServices extends Service {
    async getGoodsByOrderID(order_id) {
        let queryString = `
            SELECT orderitems.*, goods.goods_name, goods.cart_image,goods.serial_number,goods.code_bar,goods.cat
            FROM orderitems INNER JOIN goods ON orderitems.goods_id = goods.goods_id
            WHERE orderitems.order_id = '${order_id}'
        `;
        let goods = await this.app.mysql.query(queryString);
        return goods
    }
    async checkOrder(order_id, status) {
        let order = [];
        if (typeof status == 'undefined') {
            order = await this.app.mysql.select('orders', { where: { order_id } });
        } else {
            order = await this.app.mysql.select('orders', { where: { order_id, status } });
        }

        return order.length !== 0
    }
    async list(store_id, status = 1) {
        let orders = await this.app.mysql.select('orders', { where: { store_id, status } });
        return { result: { orders, status } }
    }
    async receipt(order_id) {
        let result = await this.app.mysql.update('orders', { status: 2 }, { where: { order_id } });
        return { result: result.affectedRows == 1 ? '接单成功' : "接单失败" }
    }
    async ship(order_id) {
        let result = await this.app.mysql.update('orders', { status: 3 }, { where: { order_id } });
        return { result: result.affectedRows == 1 ? '已发货' : "操作失败" }
    }
    async goods(order_id) {
        let goods = await this.getGoodsByOrderID(order_id)
        return { result: goods }
    }
}

module.exports = OrderServices