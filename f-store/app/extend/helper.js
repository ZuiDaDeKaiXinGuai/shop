const crypto = require('crypto');
const uuid = require('uuid/v4')
const randomString = ()=>{
    return uuid()
}

const generateKey = () => {
    return 'Jacky';
}
const sha256 = (secret) => {
    return crypto.createHmac('sha256', secret)
        .update(generateKey())
        .digest('hex');
}
/**
 * @description: AES-192-CBC-对称加密
 */
class AES192 {
    constructor(crypto) {
        this.crypto = crypto
        this.algorithm = 'aes-192-cbc';
        this.iv = Buffer.alloc(16, 0);
        this.cipher = this.cipher.bind(this)
        this.decipher = this.decipher.bind(this)
        this.generateKey = this.generateKey.bind(this)
    }
    generateKey(str = 'jack') {
        return this.crypto.scryptSync(str, 'salt', 24);
    }
    //加密
    cipher(target, keystr) {
        let { crypto, iv, algorithm, generateKey } = this
        let key = generateKey(keystr)
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(target, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted
    }
    //解密
    decipher(encrypted, keystr) {
        let { crypto, iv, algorithm, generateKey } = this
        let key = generateKey(keystr)
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted
    }
}
const { cipher, decipher } = new AES192(crypto);

/**
 * @description: 处理promise错误
 * @param {promise} 
 * @return: [err,result]
 */
const HPE=(promise)=> {
    if (!promise || !Promise.prototype.isPrototypeOf(promise)) {
        return new Promise((resolve, reject) => {
            reject(new Error("requires promises as the param"));
        }).catch(err => {
            return [err, null];
        })
    }
    return promise
        .then(function () {
            return [null, ...arguments]
        })
        .catch(err => {
            return [err, null];
        })
}

module.exports = { randomString, sha256, cipher, decipher, HPE, generateKey }