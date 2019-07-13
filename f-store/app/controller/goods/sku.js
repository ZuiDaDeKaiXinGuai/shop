/*
 * @Description: sku商品规格参数维护
 * @Author: shaoshan.ding
 * @LastEditors: Jacky
 * @Date: 2019-04-16 14:05:20
 * @LastEditTime: 2019-04-23 16:49:27
 */


const Controller = require('egg').Controller;
class GoodsController extends Controller {
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
        let { service, ctx } = this;
        let uid = ctx.headers.authorization;
        if (!uid) {
            ctx.body = {
                code: 401,
                msg: "权限不足。"
            }
            return false
        }
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
    async set() {
        let { app, ctx, service } = this;
        let isAuth = await this.checkAuth({
            store_id: 'string',
            cat_id: 'string',
            sku: 'json'
        })
        if (!isAuth) return;

        let { error, result } = await service.goods.sku.set(ctx.request.body)
        
        ctx.body = error ? { ...this.fail, error } : { ...this.success, result:result.affectedRows==1?'设置成功':'设置失败' }
    }
    async get() {
        let { app, ctx, service } = this;
        let isAuth = await this.checkAuth({
            store_id: 'string',
            cat_id: 'string'
        })
        if (!isAuth) return;

        let { error, result } = await service.goods.sku.get(ctx.request.body)

        ctx.body = error ? { ...this.fail, error } : { ...this.success, sku:result }
    }
    async del() {
        let { app, ctx, service } = this;
        let isAuth = await this.checkAuth({
            store_id: 'string',
            cat_id: 'string'
        })
        if (!isAuth) return;

        let { error, result } = await service.goods.sku.del(ctx.request.body);
        
        ctx.body = error ? { ...this.fail, error } : { ...this.success, msg:result.affectedRows==1?'删除成功':'删除失败' }
    }
}
module.exports = GoodsController;