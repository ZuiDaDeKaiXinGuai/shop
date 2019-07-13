/*
 * @Description: 商品分类CURD
 * @Author: Jack
 * @LastEditors: Jacky
 * @Date: 2019-04-13 23:53:26
 * @LastEditTime: 2019-04-24 09:13:36
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
  async checkAuth(valid){
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
  async list(){
    let { service, ctx } = this;
    let isAuth = await this.checkAuth({
      store_id: "string"
    });
    if(!isAuth) return;
    let {store_id} = ctx.request.body;
    let { error, result } = await service.goods.cat.list(store_id);

    ctx.body = {
      ...this.success,
      result,
      error
    }
  }
  async add() {
    let { service, ctx } = this;
    let isAuth = await this.checkAuth({
      store_id: "string",
      cat_name: "string",
    });
    if(!isAuth) return;
    let {store_id,cat_name} = ctx.request.body
    let cat_id = ctx.helper.cipher(cat_name,store_id)
    let params = {
      store_id,
      cat_name,
      cat_id 
    }

    let { error, result } = await service.goods.cat.list(store_id,cat_id);

    if(result.length>0){
      ctx.body = {
        ...this.fail,
        msg:'分类不可以重复'
      }
      return
    }
    let info = await service.goods.cat.add(params);

    ctx.body = {
      ...this.success,
      error:info.error
    }
  }
  async edit() {
    let { service, ctx } = this;
    let isAuth = await this.checkAuth({
      cat_id: "string",
      cat_name: "string",
    });
    if(!isAuth) return;
    let {cat_name,cat_id} = ctx.request.body;
    let { error, result } = await service.goods.cat.edit(cat_name,cat_id)
    ctx.body = {
      ...this.success,
      ...result,
      ...error
    }
    
  }
  async delete() {
    let { service, ctx } = this;
    let isAuth = await this.checkAuth({
      cat_id: "string"
    });
    if(!isAuth) return;
    let {cat_id} = ctx.request.body
    let { error, result } = await service.goods.cat.delete(cat_id)
    ctx.body = error?{
      ...this.fail
    }:{
      ...this.success,
      result
    }
  }
}
module.exports = GoodsController;