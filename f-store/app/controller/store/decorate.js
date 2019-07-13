/**
 * @description: 设置店铺
 * @author: shaoshan.ding
 * @param {store_id,brand_name,brand_logo,store_name,contact_number,business_time,main_image}
 */
const {Controller} = require('egg');
class  DecorateStoreController extends Controller {
    constructor(app){
      super(app)
      this.success={
        msg:'success',
        code: 1
      }
      this.fail={
        msg:'error',
        code: 0
      }
    }
    async index(){
        let {ctx, app, service} = this;
        try{
          ctx.validate({ store_id:'string'}, ctx.request.body)
        }catch(err){
          ctx.status = 400;
          ctx.body = {
            ...err,
            code: 400
          }
          return
        }
        let params = {}
        for(let i in ctx.request.body){
          if(ctx.request.body[i]){
            params[i] = ctx.request.body[i]
          }
        }
        let {error,result} = await service.store.index.decorateStore(params)
        if(error){
          ctx.status = 400;
          ctx.body = {
            ...error,
            code: 400
          }
        }else{
         
          ctx.body = {
            ...this.success,
            result
          }
        }
        
    }
}

module.exports =  DecorateStoreController;