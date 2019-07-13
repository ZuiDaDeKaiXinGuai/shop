const checkApi = require('../utils/checkWhiteList')
const jwt = require('jsonwebtoken')
let {checkWhiteList,limitedList} = checkApi
module.exports = options => {
    return async (ctx, next) => {

        // 验证超级白名单
        if (checkWhiteList(ctx.path, ctx.method, ctx.app.config.whiteList)) {

            await next();
            return;
        }

        if(limitedList(ctx.path,ctx.method, ctx.app.config.limitedList)){
            try {
                var decoded = jwt.verify(ctx.headers.authorization, ctx.helper.generateKey())

            } catch (err) {
                ctx.body = {
                    code: 0,
                    msg: '身份校验失败，该接口需要登陆。',
                    err
                }
                return
            }
        }
        
        await next();
    }
}