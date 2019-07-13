import { addShopcar } from '../../services/index'
export default {
    namespace: 'shopcar',
    state: {
        buycar: []
    },
    reducers: {
        addshopcar(state, {action}) {
            console.log(action);
            return { ...state }
        }
    },
    effects: {
        *AsynAddshopcar({ payload }, { put, call }) {
            let res =yield call(addShopcar, payload)
            yield put({
                type: 'addshopcar',
                action: res
            })

        }
    }
}