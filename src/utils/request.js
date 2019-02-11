

import axios from 'axios'
import nprogress from 'nprogress'
import { notification } from 'antd'


export const getGoods = async () => {
    return await axios.get('/api/goods')
}

export const login = async (param) => {
    return await axios.post('/api/login', param)
}


/**
 * axios 拦截器
 * 全局接口拦截器 
 * 请求前 验证数据格式
 * 请求后 重构数据格式
 */

const codeMessage = {
    202: '一个请求已经进入后台排队（异步任务）。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    500: '服务器发生错误，请检查服务器。'
}


export function setAxios() {
    axios.interceptors.request.use(
        request=>{
            nprogress.start();
            return request
        }
    )
    axios.interceptors.response.use(
        response => {
            nprogress.done();
            //1 网络请求成功
            const data = response.data
            if (response.status === 200) {
                if (data.code === -1) {
                    notification.error({
                        message: data.message,
                        description: '接口传入数据格式有问题'
                    })
                }
                return data;
            } else if(codeMessage[response.status]){
                notification.error({
                    message: '请求有问题',
                    description: codeMessage[response.status]
                })
            }
        }
    )
}