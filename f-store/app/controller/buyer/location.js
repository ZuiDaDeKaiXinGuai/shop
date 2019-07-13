/*
 * @Description: Have A Nice Day! 地理定位接口，基于腾讯地位
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-04-19 21:32:38
 * @LastEditTime: 2019-04-20 10:05:28
 */

let {Controller} = require('egg');
class Location extends Controller{
    async index() {
        let { service, ctx, app } = this;
        let {cipher, decipher} = ctx.helper;
        let { lat,lng } = ctx.request.query;
        let d = `10d17ca5fe65367e9a7e1d2403b77e72351afa4d51d9b6185d2211128473856dec8805a622eaa861fc7fcf6cdb9f2ab7`
        let key = decipher(d)
        let url =`https://apis.map.qq.com/ws/location/v1/ip?key=${key}`;
        if(lat && lng){
            url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=${key}`
        }
        let {data} = await app.curl(url,{
            method: 'GET',
            dataType: 'json',
        })
        if(data.status==0){
            let {result} = data
            delete result.address_reference
            ctx.body = { msg: 'ok', code: 1, result}
        }else{
            ctx.body = { ...data}
        }
    }
}
module.exports = Location