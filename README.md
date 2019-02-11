
抛出问题
redux-saga 为什么不用 async/await 而使用 generator


##项目文件目录

>project
    >>config ---- 项目路由配置及其需要的插件拓展
    >>mock --- 数据模拟接口
    >>mode_modules --- 项目依赖
    >>src --- 业务逻辑层
        >>>layout --- 布局页面 内部通过props.children 插入子元素
        >>>models --- redux数据管理层（数据通过utils文件夹下暴露出来的请求接口完成获取）
        >>>pages --- 页面文件 js css
        >>>utils --- 工具文件 为项目提供数据请求等
        >>>global.js --- 全局每个页面都会执行的文件（设置请求配置等全局配置）

****

##新页面创建流程
- 1 pages 目录里面新建page.js page.css
- 2 设置该 page 的mock数据依赖 /mock/文件夹下 类似node 创建接口
    格式如下:
    'get /api/goods'(req,res,next){
        res.json({
            result:[{
                title:'javascript1'
            }]
        })
    }
- 3 设置请求 api请求 单独在utils/request.js文件里面（一般是async await）
    格式如下：
    export const getGoods = async () => {
        return await axios.get('/api/goods')
    }
- 4 使用 api请求 
    1）redux 里面设置全局数据流 /models/ 首先引入该请求的函数 一般是 异步
        格式如下：
        ```   

        import {login} from '../utils/request'
        export default {
            namespace:'user',
            state:{
                token:'',
                role:''
            },
            effects:{
                *login({payload},{call,put}){
                    //payload dispatch的时候传入的数据 传入的数据
                    //call 执行异步函数
                    //put 触发reducers 数据管理
                    const result = yield call(login,payload)
                    //相当于dispatch
                    yield put({
                        type:'init',
                        payload:goods.data.result
                    })
                }
            },
            reducers:{
                init(){}
            }
        }  

        ```


