/**
 * @Description: 创建店铺
 * @Author: shaoshan.ding
 * @LastEditors: your name
 * @Date: 2019-04-11 16:43:15
 * @LastEditTime: 2019-04-11 18:34:26
 */

const {Controller} = require('egg');
class StoreController extends Controller {
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
  async admittance(){
    this.ctx.body={
      ...this.success,
      admittance:[
        '经营范围:证照内的经营范围需与商户实际经营内容、平台展示的门店类目/经营内容相符。',
        '执照提交要求:证照需彩色版；真实、完整、清晰无水印、无PS（扫描或拍照均可）；复印件需加盖红色公章。',
        '身份证明要求: 需要提供个人真实身份证号。',
        '类目:需与商户实际经营内容、证照内经营范围相符'
      ]
    }
  }
  async index(){
    let {ctx, app, service} = this;
    try{
      ctx.validate({cat_id:'string', idcard:'idcard', uid:'string', sub_cat:'string',cat:'string',store_name:"string"}, ctx.request.body)
    }catch(err){
      ctx.status = 400;
      ctx.body = {
        ...err,
        code: 400
      }
      return
    }
    
    let {cat_id, cat, sub_cat, idcard, uid, store_name, index_style=1} = ctx.request.body
    let {cipher} = ctx.helper;
    //根据店铺分类catid和用户uid生成storeid
    let store_id = cipher(cat_id, uid)
    //将身份证号加密存储
    let encrypted_idcard = cipher(idcard)
    let {error} = await service.store.index.createStore({
      store_id,
      uid,
      idcard_number:encrypted_idcard,
      catagory:cat,
      sub_catagory:sub_cat,
      store_name,
      indexstyle_id:index_style
    })
    if(error){
      error = error.errno == 1062?{msg:"cat_id或者uid重复，一个用户可以创建多个店铺但是cat分类必须不同"}:{msg:error.sqlMessage}
      ctx.status=400
      ctx.body = {
        ...this.fail,
        ...error
      }
    }else{
      ctx.body = {
        ...this.success,
        store_id
      }
    }
  }
  
}
module.exports = StoreController;