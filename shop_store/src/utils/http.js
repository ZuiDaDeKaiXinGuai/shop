import 'isomorphic-fetch';
class Query {
    constructor(options) {
        let defaults = {
            baseUrl: "",
            headers: {
                "content-type": "application/json"
            }
        }
        this.config = {
            ...defaults,
            ...options,
            headers: Object.assign({}, defaults.headers)
        }
    }
    setConfig(url,options,method){
        if (method === "get" && options.query) {
            let query = { options }
            let usp = new URLSearchParams("")
            Object.entries(query).forEach(item => {
                usp.append(item[0], item[1])
            })
            url = url + "?" + usp.toString();
        }
        let { config } = this;
        let headers = config.headers
        if (options.headers) {
            headers = { ...config.headers, ...options.headers }
        }
        if (config.baseUrl) {
            url = config.baseUrl + url
        }
        return {
            murl: url,
            headers
        }
    }
    get(url, params={}) {
     return   new Promise((resolve, reject) => {
            let usp = new URLSearchParams("")
            if(params.query){
           Object.entries(params.query).forEach(item => {
                usp.append(item[0], item[1])
            })
            url = url + "?" + usp.toString();
        }
            fetch(url, {
                method:'get',
                headers:params.headers
            }).then(res => res.json()).then(res=>{
                resolve(res)
            })
        })
    }
    post(url, params={headers:{'Accept': 'application/json'}}) {
        
     return   new Promise((resolve,reject)=>{
            let headers={...this.config.headers,...params.headers}
            fetch(url,{
                method:'post',
                headers:headers,
                body:JSON.stringify(params.body)
            }).then(res=>res.json())
            .then(res=>{
                resolve(res)
            })
        })
    }
    put(url,params){
        return   new Promise((resolve,reject)=>{
            let headers={...this.config.headers,...params.headers}
            console.log(JSON.stringify(params.body))
            fetch(url,{
                method:'put',
                headers:headers,
                body:JSON.stringify(params.body)
            }).then(res=>res.json())
            .then(res=>{
                resolve(res)
            })
        })
    }
    delete(url,params){
        return   new Promise((resolve,reject)=>{
            let headers={...this.config.headers,...params.headers}
            fetch(url,{
                method:'delete',
                headers:headers,
                body:JSON.stringify(params.body)
            }).then(res=>res.json())
            .then(res=>{
                resolve(res)
            })
        })
    }

    create(opt) {
        return new Query(opt)
    }
}
let http = new Query({
    headers: {
        "context-type": "application/json"
    }
})
export default http
