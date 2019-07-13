import {getHomelist} from '../../services/index'
export default {
    namespace: 'homelist',
    state: {
        list: [] 
    },
    reducers: {
        getgoodslist(state,{payload}){
            state.list.push(...payload.list)
            return {
                ...state,
                list:state.list
            }
        }
    },
    effects: {
        // *AsyncHomelist(state,{call,put}){
        //    let res=call(getHomelist,payload)
        //    console.log(res);
        //    yield put({
        //        type:'getgoodslist',
        //        action:res
        //    })
        // }
    }
}