import React, { Component } from 'react'
import Header from '../../components/header/index'
import {userRegister} from '../../services/index'
export default class Register extends Component {
    state={
        uaername:'',
        pwd:''
    }
    userRegist=()=>{
        let {username,pwd}=this.state;
        userRegister({
            username,
            password:pwd
        }).then(res=>{
            if(res.code==1){
                alert('注册成功')
                this.props.history.push('/login')
            }else{
                alert(res.msg)
            }
        })
    }
    render() {
        let {username,pwd}=this.state;
        return (
            <div className='register'>
                <Header style={{ background: '#333333' }} title='注册' />
                <section>
                    <div className='dialog'>
                        <p><span>用户名：</span><input type='text' onChange={(e)=>{
                            this.setState({username:e.target.value})
                        }} /></p>
                        <p><span>密码：</span><input type='password'  onChange={(e)=>{
                            this.setState({pwd:e.target.value})
                        }}/></p>
                        <p>
                            <button onClick={()=>{this.props.history.go(-1)}}>返回</button>
                            <button onClick={this.userRegist}>注册</button></p>
                    </div>
                </section>
            </div>
        )
    }
}
