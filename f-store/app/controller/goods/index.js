/*
 * @Description: 商品管理
 * @Author: shaoshan.ding
 * @LastEditors: Jacky
 * @Date: 2019-04-13 23:53:26
 * @LastEditTime: 2019-04-19 14:19:27
 */


const Controller = require('egg').Controller;
class GoodsController extends Controller {
  async list() {
    let { service, ctx } = this;
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
        store_id: "string"
      }, ctx.request.body)
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        ...err,
        code: 400
      }
      return
    }
    let { store_id } = ctx.request.body;
    let { error, result } = await service.goods.index.getGoodsListByStore(store_id);

    ctx.body = { msg: 'ok', code: 1, result, error }
  }
}
module.exports = GoodsController;