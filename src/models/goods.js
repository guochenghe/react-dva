
import {getGoods} from '../utils/request'
export default {
    namespace:'goods',
    state:{
        courses:[],
        tags:[]
    },
    //异步处理器
    effects:{
        *getList({payload},{call,put}){
            const goods = yield call(getGoods);
            /**
             * goods 数据格式
             * {data:{
             *     data:{},
             *     tags:[]
             * }}
             */
            //相当于dispatch
            yield put({
                type:'init',
                payload:goods.data
            })

        }
    },
    //处理器
    reducers:{
        init(state,action){
            const {tags,data} = action.payload;

            return {
                ...state,
                tags,
                courses:data
            }
        },
        add(state,action){
            return [...state,action.payload]
        },
        del(state,action){
            let newState = [...state];
            newState.splice(newState.length-1,1);
            return newState;
        }
    }
}