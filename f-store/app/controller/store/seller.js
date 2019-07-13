/*
 * @Description: Have A Nice Day! 店铺端的注册和登陆逻辑
 * @Author: Jacky
 * @Date: 2019-06-12 19:14:09
 * @LastEditors: Jacky
 * @LastEditTime: 2019-06-12 23:04:36
 */
const jwt = require('jsonwebtoken')
const Controller = require('egg').Controller;
class StoreController extends Controller {
    async register(ctx) {
        let { user_name, user_pwd, phone = 13333333333 } = ctx.request.body
        try{
            ctx.validate({
                user_name: 'string',
                user_pwd: 'string'
            }, ctx.request.body)
        }catch(err){
            ctx.body = {
                code: 0,
                results: err
            }
            return
        }
        if(!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,12}$/.test(user_pwd)){
            ctx.body={
                code:0,
                msg:'长度为6-12位包含数字、字母、特殊字符的密码'
            }
            return
        }
        let { sha256, randomString } = ctx.helper
        let cipheredPwd = sha256(user_pwd)
        let uid = randomString()

        let {error, results} = await this.app.mysql.query(`insert into seller (seller_name, seller_pwd, sid, phone_number) values ('${user_name}','${cipheredPwd}','${uid}', '${phone}')`)

        ctx.body = {
            code: error ? 0 : 1,
            msg: error?'':"注册成功！",
            results: error || results
        }
    }
    async login() {
        let { ctx, app, service } = this;
        try {
            ctx.validate({
                user_name: 'string',
                user_pwd: 'string',
            }, ctx.request.body)
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                ...err,
                code: 400
            }
            return
        }

        let { user_name, user_pwd } = ctx.request.body
        let { sha256, randomString } = ctx.helper
        let cipheredPwd = sha256(user_pwd)
       
        let results = await this.app.mysql.query(`select * from seller where seller_name='${user_name}' and seller_pwd='${cipheredPwd}'`)
        
        if (results.length > 0) {
            let { sid, seller_name } = results[0];
            
            let token = jwt.sign({ sid, seller_name }, ctx.helper.generateKey())
            ctx.response.body = {
                code: 1,
                token,
                msg: "success"
            }
        } else {
            ctx.body = {
                code: 0,
                msg: "密码错误，或者用户不存在"
            }
        }
    }

}
module.exports = StoreController;