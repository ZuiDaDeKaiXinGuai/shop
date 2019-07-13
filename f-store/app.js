module.exports = app => {
  console.log(`服务器重启成功,当前应用是${app.name}\n===\n===`);
  app.validator.addRule('idcard', (rule, value) => {
      //身份证正则表达式(15位)
      let isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
      //身份证正则表达式(18位)
      let isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
      if(!isIDCard2.test(value)){
        return '身份证格式不正确'
      }
  })
  app.validator.addRule('json', (rule, value) => {
    try {
      JSON.parse(value);
    } catch (err) {
      return 'must be json string';
    }
  })
  app.validator.addRule('cart', (rule, value) => {

    try {
      let cart = JSON.parse(value);
      if(Array.isArray(cart)){
        let ispass = cart.every(item=>(typeof item['goods_id']=='string' && typeof item['count']=='number' && typeof item['sku']=='string'))
        if(!ispass){
          //throw Error('data format error')
          return 'data format error'
        }
      }
    } catch (err) {
      return 'must be json string';
    }
  })
}