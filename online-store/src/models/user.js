
export default {
 
    namespace: 'user',
  
    state: {
      name:'这是bbb的model'
    },
  
    subscriptions: {
      usenc(state,payload){
        return {
            ...state
        }
      }
    },
  
    effects: {
      //异步操作
     *aUsenc(model,{call,put}){
        yield  put({type:'usenc',store_id:'1'})
      }
    },
  
    reducers: {
      
    },
};