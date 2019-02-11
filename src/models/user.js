
//用户登录 token管理 权限验证

import {login} from '../utils/request'
import router from 'umi/router'
export default {
    namespace:'user',
    state:{
        token:'',
        role:''
    },
    effects:{
        *login({payload},{call,put}){
            //payload dispatch的时候传入的数据
            //call 执行异步函数
            //put 触发reducers 数据管理
            const result = yield call(login,payload)
            
            console.log(result)
            if(result.code === 0){
                //put 相当于页面js 里面的 this.props.dispatch
                yield put({
                    type:'init',
                    payload:result
                })

                router.push('/')
            }
            
        }
    },
    reducers:{
        init(state,action){
            console.log('login init --- ',state)
            const {token,role} = action.payload.data
            return {
                ...state,
                token,
                role
            }
        },
        clear(){
            return {
                token:'',
                role:''
            }
        }
    }
}