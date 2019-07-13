/*
 * @Description: Have A Nice Day! 提交订单，生成订单号，清除购物车数据，存储订单信息
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-27 10:06:25
 * @LastEditTime: 2019-04-30 17:02:30
 */

const jwt = require('jsonwebtoken')
const privatekey = 'jack'
const Controller = require('egg').Controller;
class OrderController extends Controller {
    constructor(app) {
        super(app)
        this.success = {
            msg: 'success',
            code: 1
        }
        this.fail = {
            msg: 'error',
            code: 0
        }
    }
    async order_no(j=2) {
        var order_no = "";
        for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
        {
            order_no += Math.floor(Math.random() * 10);
        }
        order_no = 'NO'+new Date().getTime()+order_no;
        return order_no;
    }
    async checkAuth(valid) {
        let { ctx } = this;
        try {
            ctx.validate(valid, ctx.request.body)
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                ...err,
                code: 400
            }
            return false
        }
        return true
    }
    async checkToken(token){
        let uid
        try{
            uid = jwt.verify(token,privatekey)
        }catch(err){
            return false
        }
        return uid
    }
    async create() {
        let { ctx,service } = this;
        let isAuth = await this.checkAuth({
            token: "string",
            cart:'cart',
            store_id:'string',
            receiver_name:'string',
            receiver_address:'string',
            receiver_phone:'string'
        });
        if (!isAuth) return;
        let { token, cart,receiver_name,receiver_address,receiver_phone,store_id,invoice_number,invoice_title } = ctx.request.body;
        let uid = await this.checkToken(token)
        if(!uid){
            ctx.body={...this.fail,msg:"用户不存在"}
            return
        } 
        //生成订单单号
        let order_id = await this.order_no();
        let cartData = JSON.parse(cart);
        let params = {uid,order_id:order_id,receiver_name,receiver_address,receiver_phone, store_id,invoice_number,invoice_title}
        let { result, total_price,ship_price } = await service.buyer.order.addItem(cartData,order_id,store_id);
        if(result.error){
            ctx.body={
                ...this.fail,
                msg:`订单${order_id}创建失败`,
                error:result.error
            }
            return
        }
        try{
            for(let i of cartData){
                await service.buyer.cart.delete(uid, i.goods_id)
            }
        }catch(err){
            ctx.body={
                ...this.fail,
                msg:`订单${order_id}创建失败，购物车清理失败`,
                error:err
            }
            return
        }
        params.total_price = total_price;
        params.ship_price = ship_price;
        params.create_time = new Date().getTime()
        let { error,  } = await service.buyer.order.create(params);
        if(error){
            ctx.body={
                ...this.fail,
                msg:`订单${order_id}创建失败`,
                error
            }

            //已创建的订单应该删除，暂时搁置
            return
        }
        ctx.body={
            ...this.success,
            order_number:order_id,
            sum_price:total_price+ship_price,
            goods_price: total_price,
            ship_price,
            msg:"订单创建成功"
        }
    }
    async pay(){
        let {ctx,service} = this
        let isAuth = await this.checkAuth({token:'string',order_number:'string'})
        if(!isAuth) return
        let {order_number} = ctx.request.body;
        let {result} = await service.buyer.order.pay(order_number)
        ctx.body = {
            ...this.success,
            result
        }
        
    }
    async cancel(){
        let {ctx,service} = this
        let isAuth = await this.checkAuth({order_number:'string'})
        if(!isAuth) return
        
        let {order_number} = ctx.request.body;
        
        let {result} = await service.buyer.order.cancel(order_number)
        ctx.body = {
            ...this.success,
            result
        }
    }
    async list(){
        let {ctx,service} = this
        let isAuth = await this.checkAuth({token:'string',status:{required:false,type:"string"}})
        if(!isAuth) return
        let {token, status} = ctx.request.body;
        let uid = jwt.verify(token,privatekey)
        let {result} = await service.buyer.order.list(uid, status)
        ctx.body = {
            ...this.success,
            result
        }
    }
    async order(){
        let {ctx,service} = this
        let isAuth = await this.checkAuth({token:'string',status:{required:false,type:"string"}})
        if(!isAuth) return
        let {token, status} = ctx.request.body;
        let uid = jwt.verify(token,privatekey)
        let {result} = await service.buyer.order.order(uid, status)
        ctx.body = {
            ...this.success,
            result
        }
    }
}

module.exports = OrderController