/*
 * 店铺列表
 */
const jwt = require('jsonwebtoken')
const Controller = require('egg').Controller;
class StoreController extends Controller {
  async storelist(ctx) {
    let { service } = this
    let { error, result } = await service.store.index.storeList()
    this.ctx.body = { msg: 'ok', code: 1, result, error }
  }
  async ustorelist() {
    let {ctx, app, service} = this;
        try{
          let {sid} = jwt.verify(ctx.headers.authorization, ctx.helper.generateKey());
          let { error, result } = await service.store.index.storeList(sid)
          this.ctx.body = { msg: 'ok', code: 1, result, error }
        }catch(err){
          ctx.status = 400;
          ctx.body = {
            ...err,
            code: 400
          }
          return
        }
    
  }

}
module.exports = StoreController;