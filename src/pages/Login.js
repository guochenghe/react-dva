

import React from 'react'
import {connect} from 'dva'
import {Form,Input,Button,Icon} from 'antd'
import Styles from './Login.css'

import Logo from '../assets/logo.png'

import KForm from '../components/KForm'

//数据的dispatch 需要依赖这个方法 链接 models 里面的redux里面的全局数据管理方法
@connect()
@KForm
export default class Login extends React.Component{
    submitValidate = ()=>{
        //result true 验证通过
        const result = this.props.kvalidate()
        const {username,password} = this.props.kform;
        console.log(this.props.kform)
        console.log(result)
        if(result){

            //dispatch 需要connect 修饰 才可以
            /**
             * type:'user/login' type
             * 类型以 / 分割 
             * 前面的是 models 里面的命名空间
             * 在models文件夹里通过命名空间全局找 斜杠后面的方法
             * 后面的是 redux里面数据的提交 方法
             */
            this.props.dispatch({
                type:'user/login',
                payload:{username,password}
            })
        }
    }
    render(){
        return <div>
            <h2 className={Styles.title}>login page</h2>
            <div className={Styles.container}>
                <img src={Logo} alt="Logo"/>
                {this.props.krules(
                    'username',
                    [{required:true,message:'不能为空'},{minLength:3,message:'最少三个字符'}],
                    <Input 
                    placeholder="请输入用户名"
                    prefix={<Icon type="user" />}
                    />
                    )
                }

                {this.props.krules(
                    'password',
                    [{required:true,message:'不能为空'}],
                    <Input
                    placeholder="请输入密码"
                    prefix={<Icon type="lock" />}
                    />
                    )
                } 
                <Button type="primary" onClick={this.submitValidate}>确认登录</Button>         
                </div>
        </div>
    }
}

//@Form.create()
//antd 的from 表单方法
/**
 * 为组件提供 getFieldDecorator 方法
 */
class Login1 extends React.Component{
    handleSubmit = (e)=>{
        e.preventDefault()
        this.props.form.validateFields((err,values)=>{
            console.log('err info',err)
            console.log('values info', values)
            if(err){
                return;
            }
        })
    }
    render(){
        const {getFieldDecorator} = this.props.form
        console.log(getFieldDecorator)
        return <div>
            <h2 className={Styles.title}>login page</h2>
            <div className={Styles.container}>
                <img src={Logo} alt="Logo"/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username',{
                            rules:[{required:true,message:'不能为空'}]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Button htmlType="submit">submit</Button>
                </Form>
            </div>
        </div>
    }

}
