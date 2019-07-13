let Koa = require('koa');
let app = new Koa();
let fs = require('fs');
let path = require('path')
// let StaticServer=require('koa-static-server')
let Serverstatic=require('koa-static');
app.use(Serverstatic(
    path.join(__dirname, '../build')
))
let router = require('koa-router')();
router.get('/', (ctx, next) => {
    ctx.type='text/html'
    ctx.body = fs.readFileSync(path.join(__dirname, '../build', 'index.html'))
})
app.use(router.routes())
// app.use(StaticServer({
//     rootDir:'../build'
// }))
app.listen('9090', () => {
    console.log('servered at 9090 ')
})