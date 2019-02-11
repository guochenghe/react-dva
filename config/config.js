
export default {
    plugins:[
        [
            //扩展所需要的umi插件
            'umi-plugin-react',{
                antd: true, //配置antd 按需加载 同时ant-design-pro 也会按需加载
                dva:true
            }
        ]
    ],
    routes: [
        {
            path:'/login',
            component:'./Login'
        },
        {
            path:'/',
            component:'../layout',
            routes:[
                {
                    path: '/',
                    component: './App'
                },
                {
                    path:'/design',
                    component:'./Design'
                },
                {
                    path: '/about',
                    component: './About'
                },
                //没有匹配到路径的页面
                {
                    component: './404'
                }
            ]
        }
        
    ]
}
