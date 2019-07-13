/*
 * @Description: 添加商品
 * @Author: shaoshan.ding
 * @LastEditors: Jacky
 * @Date: 2019-04-16 10:39:57
 * @LastEditTime: 2019-04-19 17:58:41
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
    async index() {
        let { ctx, app, service } = this;
        let uid = ctx.headers.authorization;
        if (!uid) {
            ctx.body = {
                code: 401,
                msg: "请登录后，再添加商品。"
            }
            return
        }
        try {
            ctx.validate({
                store_id: "string",
                goods_name: "string",
                cat: "string",
                cat_id: "string",
                price: "string",
                image: "string",
                detail: "string",
                cart_image: "string",
                cost_price: "string",
            }, ctx.request.body)
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                ...err,
                code: 400
            }
            return
        }
        let { store_id, goods_name, cat, price, image, sku, detail,cat_id,cart_image,market_price,cost_price,code_bar } = ctx.request.body
        let isStoreExist = await service.index.checkStore(store_id)
        if(!isStoreExist){
            ctx.body={
                ...this.fail,
                msg:'店铺不存在，请先创建',
                store_id
            }
            return 
        }
        let { randomString, cipher } = ctx.helper;
        let params = {
            goods_id: randomString(), 
            store_id, goods_name, cat,cat_id, 
            status: 0,//默认不上架
            price, image, sku, detail, 
            create_time: new Date().getTime(),
            cart_image,market_price,cost_price,code_bar
        }

        let { error } = await service.goods.index.createGoods(params)
        if (error) {
            ctx.body = {
                code: 0,
                ...error
            }
        } else {
            ctx.body = {
                ...this.success,
                goods_id: params.goods_id
            }
        }
    }

}
module.exports = GoodsController;

