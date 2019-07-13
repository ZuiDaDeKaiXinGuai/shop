/**
 * @description: 设置店铺
 * @author: shaoshan.ding
 * @param {store_id,brand_name,brand_logo,store_name,contact_number,business_time,main_image}
 */
const {Controller} = require('egg');
class  DeleteStoreController extends Controller {
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
          ctx.validate({ store_id:'string', uid:'string', pwd:"string"}, ctx.request.body)
        }catch(err){
          ctx.status = 400;
          ctx.body = {
            ...err,
            code: 400
          }
          return
        }
        let {store_id,uid,pwd} = ctx.request.body;
        if(uid!=='jack'||pwd!=="123456"){
            ctx.body={
                code:0,
                msg: '无权限'
            }
            return
        }
        let {error,result} = await service.store.index.delStoreById(store_id)
        if(error){
          ctx.status = 400;
          ctx.body = {
            ...error,
            code: 400
          }
        }else{
          ctx.body = {
            ...this.success,
            ...result
          }
        }
        
    }
}

module.exports =  DeleteStoreController;