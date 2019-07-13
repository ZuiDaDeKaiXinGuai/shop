/*
 * @Description: Have A Nice Day! 购物车
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-26 19:18:26
 * @LastEditTime: 2019-04-27 09:05:32
 */

const jwt = require('jsonwebtoken')
const privatekey = 'jack'
const Controller = require('egg').Controller;
class CartController extends Controller {
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
        let { service, ctx } = this;
        let isAuth = await this.checkAuth({
            token: "string"
        });
        if (!isAuth) return;
        let { token } = ctx.request.body;
        let uid = jwt.verify(token,privatekey)
        let { error, result } = await service.buyer.cart.list(uid);

        ctx.body = error?{
            ...this.fail,
            error
        }:{
            ...this.success,
            result
        }
    }
    async add() {
        let { service, ctx } = this;
        try {
            let testdata = ctx.request.body
            testdata.count = testdata.count * 1;
            testdata.price = testdata.price * 1;
            ctx.validate({
                token: 'string', goods_id: 'string', price: 'number', count: 'number'
            }, testdata)
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                ...err,
                code: 400
            }
            return false
        }
        let { token } = ctx.request.body;
        let uid = jwt.verify(token,privatekey)
        let ifUidExsit = await service.index.checkBuyer(uid);
        if (!ifUidExsit) {
            ctx.status = 400;
            ctx.body = {
                msg: '用户不存在',
                code: 400
            }
            return false
        }
        let params = {...ctx.request.body,uid};
        delete params.token
        let { error, result } = await service.buyer.cart.add(params);

        ctx.body = error ? {
            error,
            ...this.fail
        } : {
                ...this.success
            }
    }
    async edit() {
        let { service, ctx } = this;
        let isAuth = await this.checkAuth({
            token: 'string', goods_id: 'string',count:'string'
        });
        if (!isAuth) return;
        let { token, goods_id, count } = ctx.request.body;
        let uid = jwt.verify(token,privatekey)
        let { error, result } = await service.buyer.cart.edit(uid, goods_id, count*1 )
        
        ctx.body = error?{
            ...this.fail,
            error
        }:{
            ...this.success
        }

    }
    async delete() {
        let { service, ctx } = this;
        let isAuth = await this.checkAuth({
            token: "string",
            goods_id: 'string'
        });
        if (!isAuth) return;
        let { token,goods_id } = ctx.request.body;
        let uid = jwt.verify(token,privatekey)
        let { error, result } = await service.buyer.cart.delete(uid,goods_id)
        ctx.body = error ? {
            ...this.fail,
            error
        } : {
                ...this.success
            }
    }
}
module.exports = CartController;