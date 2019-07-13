/*
 * @Description: Have A Nice Day! 我的订单
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-29 09:42:16
 * @LastEditTime: 2019-04-29 09:44:45
 */
const Controller = require('egg').Controller;
const privatekey = 'jack'
const svgCaptcha = require('svg-captcha');
const jwt = require('jsonwebtoken')
class BuyerController extends Controller {
    async orderlist() {
        let { service, ctx } = this;
        let { cipher, sha256, HPE, randomString } = ctx.helper;
        try {
            ctx.validate({
                username: "string",
                password: "string",
            }, ctx.request.body)
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                ...err,
                code: 400
            }
            return
        }
        //获取用户注册时的用户名和密码
        let { username, password, nickname, portrait, gender, phone_number, status = 0 } = ctx.request.body
        //crypto 非对称加密
        let secretPwd = sha256(password, privatekey)
        let params = {
            buyer_name: username,
            buyer_pwd: secretPwd,
            status,
            nickname, portrait, gender, phone_number
        }

        //添加数据库
        let { error, result } = await service.buyer.user.register(params)

        if (error) {
            ctx.response.body = {
                msg: error,
                code: 0
            }
        } else {
            ctx.response.body = {
                msg: 'success',
                code: 1
            }
        }

    }
}

module.exports = BuyerController