/*
 * @Description: 图片上传
 * @Author: shaoshan.ding
 * @LastEditors: Jacky
 * @Date: 2019-04-12 15:04:16
 * @LastEditTime: 2019-06-11 17:00:26
 */

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const pump = require('mz-modules/pump');

class ImageController extends Controller {
  async upload() {
    const { ctx, config, service } = this;
    const files = ctx.request.files;
    const {store_id} = ctx.request.query;

    const user = await service.index.checkStore(store_id)
    if(!user){
      ctx.status=401;
      ctx.body={
        msg:"没有店铺信息，请先创建店铺",
        code: 401
      }
      return;
    }
    const uploadPath = config.storeUploadImage;
    const url=[]
    try {
      for (const file of files) {
        const filename = file.filename.toLowerCase();
        const extname = path.extname(filename)
        const basename = path.basename(filename,extname)

        const bsname = Buffer.from(basename).toString('base64')
        
        if(!fs.existsSync(uploadPath)){
          await fs.mkdir(uploadPath, { recursive: true });
        }
        const targetPath = path.join(uploadPath, bsname+extname);
        const source = fs.createReadStream(file.filepath);
        const target = fs.createWriteStream(targetPath);

        await pump(source, target);
        url.push({
          filename,
          url: `${config.static.prefix}assets/upload/${bsname+extname}`
        })
      }
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    ctx.body={
      msg:"success",
      code:1,
      url
    }
  }
}
module.exports = ImageController;