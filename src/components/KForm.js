
import React from 'react'

import {Icon} from 'antd'


export default  function KForm(Comp){
    return class NewComp extends React.Component{
        constructor(props){
            super(props)
            //每次改变state 都要重新执行render 方法
            //所以不涉及ui组件的 数据尽量不要放在state 里面声明
            this.state = {}
            this.rules = {}
        }
        clearInput(name){
            this.setState({
                [name]:''
            })
        }
        krules = (name,rules,comp)=>{
            this.rules[name] = rules

            const suffix = this.state[name]?<Icon type="close-circle" onClick={()=>{this.clearInput(name)}}></Icon>:null;
            
            //comp 虚拟dom 不能直接返回jsx 格式的dom元素 <comp></comp>
            //通过cloneElement 方法扩展该虚拟dom的props 属性
            //suffix 在文本框后面加icon 和 prefix 相反
            return <div>
                <p style={{color:'red'}}>{this.state[name+'Message']}</p>
                {React.cloneElement(comp,{
                    suffix,
                    name:name,
                    type:name,
                    onChange:this.handleChange,
                    value:this.state[name]
                })}
            </div>
        }
        handleChange = (e)=>{

            const {name,value} = e.target
            this.setState({
                [name]:value
            },()=>{
                this.kvalidateItem(name)
            })

            
        }
        //校验整个表单
        kvalidate = ()=>{
            let kvalidateResult = Object.keys(this.rules).map(name=>{
                return this.kvalidateItem(name)
            })

            kvalidateResult = kvalidateResult.every(curValue => {
                //curValue true 表示该项验证没有通过
                return !curValue
            })
            return kvalidateResult;
        }
        //传入当前需要验证的 input name 属性===>>找到对应的state信息
        kvalidateItem = (name)=>{

            const rule = Array.isArray(this.rules[name])?this.rules[name]:[this.rules[name]];


            let result = rule.some(item=>{
                
                if(item.required){
                    if(!this.state[name]){
                        this.setState({
                            [name+'Message']:item.message
                        })
                        return true;
                    }else{
                        this.setState({
                            [name+'Message']:''
                        })
                    }
                }
                if(item.minLength){
                    if(this.state[name].length < 3){
                        this.setState({
                            [name+'Message']:item.message
                        })
                        return true;
                    }else{
                        this.setState({
                            [name+'Message']:''
                        })
                    }
                }
            })
            console.log('kvalidate-----',result)
            //result 返回是否有验证成功的
            return result;

        }
        render(){
            return <Comp {...this.props} krules={this.krules} kvalidate={this.kvalidate} kform={this.state}></Comp>
        }
    }
}