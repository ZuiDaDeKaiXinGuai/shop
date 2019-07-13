/*
 * @Description: 卖家端
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-19 15:11:11
 * @LastEditTime: 2019-04-30 16:42:03
 */
const fs = require('fs')
const Controller = require('egg').Controller;
class BuyerController extends Controller {
  async index() {
    let { service, ctx } = this
    ctx.response.type = 'text/html'
    ctx.body = fs.readFileSync(process.cwd()+'/app/public/index.html')
  }
  async storelist() {
    let { service, ctx } = this;
    let { type = [0, 1, 2], page = 1, pagesize = 10 } = ctx.request.query;
    let { error, result } = await service.goods.index.getStoreList(type, page * 1, pagesize * 1);

    ctx.body = { msg: 'ok', code: 1, result, error }
  }
  async getStoreById() {
    let { service, ctx } = this;
    try {
      ctx.validate({
        store_id: "string"
      }, ctx.request.query)
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        ...err,
        code: 400
      }
      return
    }
    let {store_id} = ctx.request.query;
    let { error, result } = await service.store.index.getStoreById(store_id);

    ctx.body = { msg: 'ok', code: 1, result, error }
  }
  async goodsListByType() {
    let { service, ctx } = this;
    try {
      ctx.validate({
        store_id: "string"
      }, ctx.request.query)
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        ...err,
        code: 400
      }
      return
    }
    let { type = [0, 1, 2], page = 1, pagesize = 10, store_id } = ctx.request.query;
    let { error, result } = await service.goods.index.getGoodsListByType(type, page * 1, pagesize * 1, store_id);

    ctx.body = { msg: 'ok', code: 1, result, error }
  }
  async totalGoodsList() {
    let { service, ctx } = this;
    let { error, result } = await service.goods.index.getTotalGoodsList();

    ctx.body = { msg: 'ok', code: 1, length: (result && result.length), result, error }
  }
  async goodsDetail() {
    let { service, ctx } = this;
    let { goods_id } = ctx.request.query;
    try {
      ctx.validate({
        goods_id: "string"
      }, ctx.request.query)
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        ...err,
        code: 400
      }
      return
    }
    let { error, result } = await service.goods.index.getGoodsDetail(goods_id);

    ctx.body = { msg: 'ok', code: 1, result: result[0], error }
  }

  async fakegoodscat() {
    let { app, ctx } = this
    let fakeurl = `http://mobile.jumei.com/msapi/mall/allcategories.json`
    const result = await app.curl(fakeurl, {
      method: 'GET',
      dataType: 'json',
    });

    ctx.body = {
      code: 1,
      ...result.data
    }

  }
  async fakegoodslist() {
    let { app, ctx } = this
    let fakeurl = `http://touch.m.dangdang.com/h5ajax.php?timestamp=${new Date().getTime()}&time_region=recent7&bang_name=bestsell&cat_path=01.00.00.00.00.00&img_size=b&page=${ctx.request.query.page}&pagesize=10&ischildren=0&price_region=0&tab_cate=bestsell&action=bang_tushu`
    const result = await app.curl(fakeurl, {
      method: 'GET',
      dataType: 'json',
    });

    ctx.body = {
      code: 1,
      data: [...result.data.products]
    }

  }
}
module.exports = BuyerController;