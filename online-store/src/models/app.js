import data from "../data/storedata.json"
function delay(time=1000){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          resolve(123)
      },time)
  })
}

export default {
    namespace: 'app',
  
    state: {
      count:1,
      store_data:[]
    },
  
    subscriptions: {
      
    },
  
    effects: {
      *asyncAddCount(a,{call, put}){
        // console.log(a)
        let num = yield call(delay,2000)
        yield put({type:'addCount',payload:num})
      }
    },
  
    reducers: {
      addCount(state,{payload}){
        console.log(state,payload)
        let {count}=state
        count++
        return {
          ...state,
          count
        }
      },
      //店铺首页的数据
      storeData(state,{payload}){
        // console.log(state)
        let {store_data}=state
        store_data=data
        return {
          ...state,
          store_data
        }
      },
    },
  
  };