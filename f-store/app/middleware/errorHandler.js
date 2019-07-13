module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next();
        } catch (err) {
            // 记录一条错误日志
            ctx.app.emit('error', err, ctx);

            const status = err.status || 500;
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            //   const error = status === 500 && ctx.app.config.env === 'prod'
            //     ? 'Internal Server Error'
            //     : err.message;

            ctx.body = { msg: 'Internal Server Error', error: err.message, code: 0 };
            if (status === 422) {
                ctx.body.detail = err.errors;
            }
            ctx.status = status;
        }
    }
}