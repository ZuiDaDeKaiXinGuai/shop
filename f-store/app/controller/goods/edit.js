/*
 * @Description: 修改商品信息
 * @Author: shaoshan.ding
 * @LastEditors: Jacky
 * @Date: 2019-04-16 10:39:57
 * @LastEditTime: 2019-04-22 11:18:19
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
    async checkAuth(params) {
        let { ctx, app, service } = this;
        let uid = ctx.headers.authorization;
        if (!uid) {
            ctx.body = {
                code: 401,
                msg: "请登录。"
            }
            return false
        }
        
        try {
            params && ctx.validate(params, ctx.request.body)
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
    async index() {
        let { ctx, app, service } = this;
        let isAuth = await this.checkAuth({
            goods_id: "string",
        })
        if (!isAuth) return;
        let { goods_id, goods_name, price, image, sku, detail, type } = ctx.request.body
        // let { cipher } = ctx.helper;
        let params = {
            goods_name, price, image, sku, detail, update_time: new Date().getTime(),type
        }

        let { error } = await service.goods.index.editGoods(goods_id, params)
        ictx.body = error?{
            ...this.fail,
            ...error
        }:{
            ...this.success,
            params
        }
    }
    async offshelf() {//下架
        let { ctx, app, service } = this;
        let isAuth = await this.checkAuth({
            goods_id: "string",
        })
        if (!isAuth) return;
        let { goods_id } = ctx.request.body
        let { error } = await service.goods.index.editGoods(goods_id, { status: 0 })
        ctx.body = error ? { ...error, ...this.fail } : { ...this.success }
    }
    async onshelf() {//上架
        let { ctx, app, service } = this;
        let isAuth = await this.checkAuth({
            goods_id: "string",
        })
        if (!isAuth) return;
        let { goods_id } = ctx.request.body
        let { error } = await service.goods.index.editGoods(goods_id, { status: 1 })
        ctx.body = error ? { ...error, ...this.fail } : { ...this.success }
    }
    async shelfInBulk() {//批量上下架
        let { ctx, app, service } = this;
        let isAuth = await this.checkAuth({status:"string"})
        if (!isAuth) return;
        let { goods_id_list, status } = ctx.request.body;
        try{
            goods_id_list = JSON.parse(goods_id_list);
            
            let { error,result } = await service.goods.index.editGoods(goods_id_list, { status:status*1 });
            ctx.body = error?{ ...error, ...this.fail }:{ ...this.success, result, msg:status==1?"上架成功":"下架成功" }
        }catch(e){
            ctx.body ={
                ...this.fail,
                error:e
            }
        }
        
        
    }
    async delete(){
        let { ctx, app, service } = this;
        let isAuth = await this.checkAuth({goods_id:"string"})
        if (!isAuth) return;
        let { goods_id } = ctx.request.body;
        let { error,result } = await service.goods.index.delGoodsById(goods_id);
        ctx.body = error?{ ...error, ...this.fail }:{ ...this.success, deleted:result.affectedRows!=0?goods_id:'不存在的商品' }
    }
}
module.exports = GoodsController;

