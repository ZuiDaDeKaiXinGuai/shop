function checkWhiteList(url,method,whiteList){
    let result = whiteList.findIndex(item => {
        if(typeof item.url === 'string'){
            return item.url === url && (item.method === 'any' || item.method === method);
        }
        if(item.url instanceof RegExp){
            return item.url.test(url) && (item.method === 'any' || item.method === method);
        }
    });
    return result !== -1;
}
function limitedList(url,method,list){
    let result = list.findIndex(item => {
        if(typeof item.url === 'string'){
            return item.url === url && (item.method === 'any' || item.method === method);
        }
        if(item.url instanceof RegExp){
            return item.url.test(url) && (item.method === 'any' || item.method === method);
        }
    });
    return result !== -1;
}
module.exports = {checkWhiteList,limitedList};