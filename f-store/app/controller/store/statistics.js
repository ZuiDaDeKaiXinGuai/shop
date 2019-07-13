/*
 * @Description: Have A Nice Day! 卖家端数据统计
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-19 15:11:11
 * @LastEditTime: 2019-04-26 10:11:52
 */

const _ = require('lodash')
const { Controller } = require('egg');
class StatisticsStoreController extends Controller {
  constructor(app) {
    super(app)
    this.success = {
      msg: 'success',
      code: 1
    }
    this.fail = {
      msg: 'error',
      code: 0
    }
  }
  format() {
    var s = '';
    var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
    var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
    s += this.getFullYear() + '-'; // 获取年份。
    s += mouth + "-"; // 获取月份。
    s += day; // 获取日。
    return (s); // 返回日期。
  }
  getAllDays(begin, end) {
    var arr = [];
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
    var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
    for (var k = unixDb; k <= unixDe;) {
      k = k + 24 * 60 * 60 * 1000;
      arr.push(this.format.call(new Date(parseInt(k))));
    }
    return arr;
  }
  async count() {
    let { ctx, app, service } = this;
    try {
      ctx.validate({ store_id: 'string', from: 'date', to: 'date' }, ctx.request.query)
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        ...err,
        code: 400
      }
      return
    }
    let { from, to, store_id } = ctx.request.query;
    // let {error,result} = await service.store.index.statisticsCount(params)

    let days = this.getAllDays(from,to)
    let result = days.map(item=>{
      return {
        date:item,
        count: _.random(0, 300)
      }
    })
    
    ctx.body = {
      ...this.success,
      result
    }

  }
  async profit() {
    let { ctx, app, service } = this;
    try {
      ctx.validate({ store_id: 'string', from: 'date', to: 'date' }, ctx.request.query)
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        ...err,
        code: 400
      }
      return
    }
    let { from, to, store_id } = ctx.request.query;
    // let {error,result} = await service.store.index.statisticsCount(params)

    let days = this.getAllDays(from,to)
    let result = days.map(item=>{
      return {
        date:item,
        count: _.random(110.01, 30000.01).toFixed(2)
      }
    })
    
    ctx.body = {
      ...this.success,
      result
    }

  }
  async catcount() {
    let { ctx, app, service } = this;
    try {
      ctx.validate({ store_id: 'string', from: 'date', to: 'date' }, ctx.request.query)
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        ...err,
        code: 400
      }
      return
    }
    let { from, to, store_id } = ctx.request.query;
    // let {error,result} = await service.store.index.statisticsCount(params)
    let days = this.getAllDays(from,to)
    let catCount = Math.ceil(_.random(1,days.length)/2);
    if(catCount>6) (catCount=6);
  
    let result = [];
    
    for(let i=1;i<=catCount;i++){
      result.push({
        name:`商品${i}`,
        value: _.random(1,3*days.length)
      })
    }
    
    ctx.body = {
      ...this.success,
      result
    }

  }
}

module.exports = StatisticsStoreController;