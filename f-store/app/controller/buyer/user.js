/*
 * @Description: Have A Nice Day! 买家注册/登陆
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-27 09:45:37
 * @LastEditTime: 2019-04-29 09:42:46
 */
const Controller = require('egg').Controller;
const privatekey = 'jack'
const svgCaptcha = require('svg-captcha');
const jwt = require('jsonwebtoken')
class BuyerController extends Controller {
    async register() {
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
    async login() {
        let { service, ctx } = this;
        let { decipher, sha256 } = ctx.helper;
        try {
            ctx.validate({
                username: "string",
                password: "string",
                captcha: "string"
            }, ctx.request.body)
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                ...err,
                code: 400
            }
            return
        }

        let { username, password, captcha } = ctx.request.body;

        let captchaCode = ctx.cookies.get('captcha');
        //解析验证码
        let decoded = decipher(captchaCode, privatekey).toLowerCase();
        if (!captcha || captcha !== decoded) {
            ctx.response.body = {
                msg: "验证码错误",
                code: -1,
                status: 402
            }
            return
        }
        let secretPwd = sha256(password, privatekey)
        // let [err, [res]] = await hpe(ctx.mysql(`select * from pkuser where username='${username}' and password='${secretPwd}'`))
        let { error, result } = await service.buyer.user.login(username, secretPwd)
        if (error) {
            ctx.response.body = {
                msg: error,
                code: 0
            }
            return
        }
        if (!result) {
            ctx.response.body = {
                msg: '用户不存在',
                code: 0
            }
            return
        }

        delete result.buyer_pwd;
        delete result.id;
        let token = jwt.sign(result.uid, privatekey)
        result.token = token;
        delete result.uid;
        ctx.response.body = {
            msg: 'success',
            code: 1,
            ...result
        }
    }
    async editBuyer(){//编辑用户信息
        
    }
    async storeCollectList(){//收藏列表

    }
    async addStoreCollect() {//店铺收藏
        let { service, ctx } = this;
        try {
            ctx.validate({
                token: "string",
                store_id: "string",
            }, ctx.request.body)
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                ...err,
                code: 400
            }
            return
        }
        let { token, store_id } = ctx.request.body
        let uid = jwt.verify(token, privatekey)
        let { error, result } = await service.buyer.user.addStoreCollect(uid, store_id)
        ctx.response.body = error ? {
            msg: 'error',
            code: 0
        } : {
            msg: 'success',
                code: 1
            }
    }
    async removeStoreCollect() {//店铺收藏
        let { service, ctx } = this;
        try {
            ctx.validate({
                token: "string",
                store_id: "string",
            }, ctx.request.body)
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                ...err,
                code: 400
            }
            return
        }
        let { token, store_id } = ctx.request.body
        let uid = jwt.verify(token, privatekey)
        let { error, result } = await service.buyer.user.removeStoreCollect(uid, store_id)
        ctx.response.body = error ? {
            msg: 'error',
            code: 0
        } : {
            msg: 'success',
                code: 1
            }
    }
    async captcha() { //session  token
        let { ctx } = this;
        let { cipher, sha256, HPE } = ctx.helper;

        let captcha = svgCaptcha.create({
            noise: 8,
            ignoreChars: '0o1i',
            background: '#5ADAD0'
        })
        let signedCaptcha = cipher(captcha.text, privatekey);

        ctx.cookies.set('captcha', signedCaptcha)

        ctx.response.body = {
            msg: 'ok',
            code: 1,
            data: captcha.data
        }
    }
}

module.exports = BuyerController