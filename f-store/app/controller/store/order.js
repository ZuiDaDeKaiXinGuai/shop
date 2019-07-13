/* 
 * @Description: Have A Nice Day! 接单
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-29 17:33:19
 * @LastEditTime: 2019-04-30 11:26:59
 */

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
    async list() {
        let { ctx,service } = this;
        let isAuth = await this.checkAuth({
            store_id:'string'
        });
        if(!isAuth) return;
        let {store_id,status} = ctx.request.body;
        let {result} = await service.store.order.list(store_id,status)
        ctx.body={
            ...this.success,
            result
        }
    }
    async receipt() {//接单
        let { ctx,service } = this;
        let isAuth = await this.checkAuth({
            order_number:'string'
        });
        if(!isAuth) return;
        let {order_number} = ctx.request.body
        let {result } = await service.store.order.receipt(order_number)
        ctx.body={
            ...this.success,
            result
        }
    }
    async goods(){
        let { ctx,service } = this;
        let isAuth = await this.checkAuth({
            order_number:'string'
        });
        if(!isAuth) return;
        let {order_number} = ctx.request.body
        let {result } = await service.store.order.goods(order_number)
        ctx.body={
            ...this.success,
            result
        }
    }
    async ship(){
        let { ctx,service } = this;
        let isAuth = await this.checkAuth({
            order_number:'string'
        });
        if(!isAuth) return;
        let {order_number} = ctx.request.body
        let {result } = await service.store.order.ship(order_number)
        ctx.body={
            ...this.success,
            result
        }
    }
}

module.exports = OrderController