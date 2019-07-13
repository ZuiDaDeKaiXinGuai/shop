/*
 * @Description: Have A Nice Day! 订单管理
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-26 19:39:52
 * @LastEditTime: 2019-04-30 17:14:36
 * status:   未付款	已付款   待发货  已发货 已收货  已取消
 * order_status	0	 1	     2	   3 	  4	     5   
 */

const Service = require('egg').Service;
class OrderServices extends Service {
    async checkgoods(goods_id) {
        const goods = await this.app.mysql.query('select * from goods where goods_id = ?', goods_id);
        return goods.length !== 0
    }
    async checkStore(store_id) {
        const store = await this.app.mysql.query('select * from store where store_id = ?', store_id);
        return store.length !== 0
    }
    async checkOrder( order_id, status) {
        let order=[];
        if(typeof status == 'undefined'){
            order = await this.app.mysql.select('orders', { where: { order_id } });
        }else{
            order = await this.app.mysql.select('orders', { where: { order_id, status } });
        }
        
        return order.length !== 0
    }
    async addItem(cartdata,order_id,store_id) {
        let storeExist = await this.checkStore(store_id);
        if(!storeExist){
            return {result:{error:"店铺不存在"}}
        }
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        let total_price = 0;
        let [err,[fee]] = await HPE(app.mysql.select('store',{where:{store_id},columns:['delivery_fee']}));
  
        try{
            for(let i of cartdata){
                let params={
                    order_id:order_id,
                    goods_id:i.goods_id,
                    goods_sku:i.sku,
                    goods_count: i.count,
                    create_time: Date.now()
                }
                
                let [ , goods] = await HPE(app.mysql.select('goods',{where:{goods_id:params.goods_id},columns:['price']}));
                
                if(goods[0]){
                    params.goods_price = goods[0].price
                }else{
                    throw new Error(`goods ${params.goods_id} does not exist`);
                }
                let [err, result] = await HPE(app.mysql.insert('orderitems',params));
                if(result.affectedRows==0){
                    throw new Error(`goods ${params.goods_id} insert failed`);
                }
                //计算价格
                total_price+=params.goods_count*params.goods_price
            }
        }catch(error){
            
            return {result: {error:error.toString()}}
        }
        
        return { result: '保存成功！', total_price, ship_price:fee.delivery_fee }
    }
    async create(params) {
        let { app, ctx } = this;
        let { HPE } = ctx.helper;
        
        params.status = 0;//创建订单
        let {uid} = params;
        let [, result0] = await HPE(app.mysql.select('orders',{where:{uid,status:0}}));

        if(result0.length>2){
            return {error:{info:"有多个未完成订单，不能再创建新订单",order:[...result0]}}
        }
        
        let [error, result] = await HPE(app.mysql.insert('orders',params))
        return error ? { error } : { result }
    }
    async pay(order_id){
        let orderExist = await this.checkOrder(order_id, 0);
        if(!orderExist){
            return {
                result:`订单${order_id}不存在`
            }
        }
        const order = await this.app.mysql.update('orders',{status:1,pay_time: Date.now()} ,{ where: { order_id } });
        return {result: order.affectedRows==1?'支付成功':'支付失败'};
    }
    async cancel(order_id){
        let orderExist = await this.checkOrder(order_id, 0);
        if(!orderExist){
            return {
                result:`订单${order_id}不存在`
            }
        }
        const order = await this.app.mysql.update('orders',{status:5} ,{ where: { order_id } });
        return {result: order.affectedRows==1?'订单已取消':'订单取消失败'}
    }
    async list(uid, status){
        let orders=[];
        if(typeof status=='undefined'){
            orders = await this.app.mysql.select('orders', { where: { uid } });    
        }else{
            orders = await this.app.mysql.select('orders', { where: { uid,status } });
        }
        let goodslist=[];
        
        for(let i of orders){

            let queryString = `
                SELECT orderitems.*, goods.goods_name, goods.cart_image,goods.serial_number,goods.code_bar,goods.cat
                FROM orderitems
                INNER JOIN goods ON orderitems.goods_id = goods.goods_id
                WHERE orderitems.order_id = '${i.order_id}'
            `;
            let goods = await this.app.mysql.query(queryString)
           
            goodslist=[...goodslist,...goods]
        }
        
        return {result: {goodslist,status}}
    }
    async order(uid, status){
        let orders=[];
        if(typeof status=='undefined'){
            orders = await this.app.mysql.select('orders', { where: { uid },columns:['order_id','status','uid','store_id'] });    
        }else{
            orders = await this.app.mysql.select('orders', { where: { uid,status },columns:['order_id','status','uid','store_id'] });
        }
        
        return {result: {orders,status}}
    }
}

module.exports = OrderServices