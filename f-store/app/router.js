/*
 * 应用的路由配置部分
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/',controller.buyer.index.index)
    /**
     * @description: 开店须知
     */
    router.get('/store/admittance', controller.store.create.admittance);

    /**
     * @description: 添加/获取店铺分类
     * @param {cat_name, sub_cat_name} 
     */
    router.put('/store/catagory', controller.store.catagory.add);
    router.get('/store/catagory', controller.store.catagory.all);

    /**
     * @description: 图片上传，多图上传
     * @param {FormData}
     */
    router.post('/upload', controller.store.upload.upload);

    /**
     * @description: 地理定位
     * @param {lat, lng} 
     */
    router.get('/location', controller.buyer.location.index)

    /**
     * @description: 卖家注册与登陆
     */
    router.post('/store/register',controller.store.seller.register)
    router.post('/store/login',controller.store.seller.login)

    /**
     * @description: 创建店铺/删除/设置
     * @param {cat_id, cat, sub_cat, idcard, uid, store_name} 
     */
    router.post('/store/create', controller.store.create.index);
    router.delete('/store/delete', controller.store.delete.index);
    router.post('/store/decorate', controller.store.decorate.index);

    /**
     * @description: 查询店铺/我的店铺
     */

    router.get('/store/storelist', controller.store.index.storelist);
    router.get('/store/ustorelist', controller.store.index.ustorelist);
    router.post('/store/order/receipt', controller.store.order.receipt);
    router.post('/store/order/list', controller.store.order.list);
    router.post('/store/order/goods', controller.store.order.goods)
    router.post('/store/order/ship', controller.store.order.ship)

    /**
     * @description: 商品分类管理 CURD
     */
    router.post('/store/goods/cat.list', controller.goods.catagory.list)
    router.put('/store/goods/cat.add', controller.goods.catagory.add)
    router.post('/store/goods/cat.edit', controller.goods.catagory.edit)
    router.delete('/store/goods/cat.delete', controller.goods.catagory.delete)

    /**
     * @description: 商品sku管理 
     */
    router.post('/store/goods/sku.set', controller.goods.sku.set)
    router.post('/store/goods/sku.get', controller.goods.sku.get)
    router.post('/store/goods/sku.del', controller.goods.sku.del)

    /**
     * @description: 商品管理 
     */
    router.post('/store/goods/create', controller.goods.create.index)
    router.post('/store/goods/edit', controller.goods.edit.index)
    router.delete('/store/goods/delete', controller.goods.edit.delete)
    router.post('/store/goods/offshelf', controller.goods.edit.offshelf)
    router.post('/store/goods/shelfInBulk', controller.goods.edit.shelfInBulk)
    router.post('/store/goods/onshelf', controller.goods.edit.onshelf)
    /**
     * @description: 买家端获取商品列表
     */
    router.post('/store/goods/list', controller.goods.index.list)
    router.get('/store/goods/totallist', controller.buyer.index.totalGoodsList)

    /**
     * @description: 销售数据统计
     */
    router.get('/store/statistics/count', controller.store.statistics.count)
    router.get('/store/statistics/profit', controller.store.statistics.profit)
    router.get('/store/statistics/catcount', controller.store.statistics.catcount)
    
    /**
     * @description: 测试商品数据（临时接口） 
     */
    router.get('/store/goods/catlist', controller.buyer.index.fakegoodscat)
    router.get('/store/goods/goodslist', controller.buyer.index.fakegoodslist)

    /**
     * @description: 买家端首页商品
     * @param {type:0} 默认排序，按销量 
     * @param {type:1} 店铺推荐 
     * @param {type:2} 折扣促销 
     */
    router.get('/buyer/homelist', controller.buyer.index.goodsListByType)
    router.get('/buyer/storelist', controller.buyer.index.storelist)
    router.get('/buyer/detail', controller.buyer.index.goodsDetail)
    router.get('/store/getstore', controller.buyer.index.getStoreById);


    /**
     * @description: 买家注册
     */
    router.post('/buyer/user/register', controller.buyer.user.register)
    router.post('/buyer/user/login', controller.buyer.user.login)
    router.post('/buyer/user/store.collect.add', controller.buyer.user.addStoreCollect)
    router.post('/buyer/user/store.collect.remove', controller.buyer.user.removeStoreCollect)
    router.get('/buyer/user/captcha', controller.buyer.user.captcha)

    /**
     * @description: 购物车
     */
    router.post('/buyer/cart/list', controller.buyer.cart.list)
    router.post('/buyer/cart/add', controller.buyer.cart.add)
    router.post('/buyer/cart/edit', controller.buyer.cart.edit)
    router.post('/buyer/cart/delete', controller.buyer.cart.delete)

    /**
     * @description: 提交订单
     */
    router.post('/buyer/order/create', controller.buyer.order.create)
    router.post('/buyer/order/pay', controller.buyer.order.pay)
    router.post('/buyer/order/cancel', controller.buyer.order.cancel)
    router.post('/buyer/order/list', controller.buyer.order.list)
    router.post('/buyer/order/order', controller.buyer.order.order)

}

