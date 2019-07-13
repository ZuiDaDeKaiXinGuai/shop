/**
 * @description: 店铺分类管理
 * @param {type} 
 * @return: 
 */
const {Service} = require('egg')
class Catagory extends Service {
    constructor(app){
        super(app)
    }
    async add(){
        let {ctx, service} = this;

        let {cat_name, sub_cat_name} = ctx.request.body

        // let result = await service.store.index.addShopCatagory({
        //     cat_name,
        //     sub_cat_name
        // })
        let result = {
            msg:"暂时不支持添加新的分类"
        }
        ctx.body={
            msg:"success",
            code:1,
            ...result
        }
    }
    async all(){
        let {ctx, service} = this;

        let result = await service.store.index.allShopCatagory()
        let list = result.data.map(item=>{
            item.sub_cat_name = item.sub_cat_name.split(',')
            return item
        })

        ctx.body={
            msg:"success",
            code:1,
            list
        }
    }
}
module.exports = Catagory