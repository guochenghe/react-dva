
import React from 'react'
import {connect} from 'dva'
import {Button} from 'antd'

@connect(
    //state . models 下面的命名空间
    //和 dispatch中的type结构类似
    state=>({
        tags:state.goods.tags
    })
)
class App extends React.Component{
    componentDidMount(){

        this.getList()
    }
    getList(){
        this.props.dispatch({
            type:'goods/getList'
        })
    }
    handleAdd = ()=>{
        this.props.dispatch({
            //命名空间/reducer方法名
            type:'goods/add',
            //payload 装载数据 传进去的数据
            payload:{
                title:'luffytest'+new Date().getTime()
            }
        })
    }
    handleDel = ()=>{
        this.props.dispatch({
            //命名空间/reducer方法名
            type:'goods/del'
        })
    }
    render(){
        return <div>
            <h2>App component</h2>
            <ul>
                {this.props.tags.map(tag=>{
                    return <li key={tag}>{tag}</li>
                })}
            </ul>
            {/* <ul>
                {this.props.goodList.map(good=>{
                    return <li key={good.title}>{good.title}</li>
                })}
            </ul> */}

            <Button onClick={this.handleAdd}>添加</Button>
            <Button onClick={this.handleDel}>删除最后一个</Button>
        </div>
    }
}

export default App