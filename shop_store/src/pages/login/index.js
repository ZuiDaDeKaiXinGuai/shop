import React, { Component } from 'react'
import Header from '../../components/header/index'
import { userLogin, getCapcha } from '../../services/index'
export default class Login extends Component {
    state = {
        username: '',
        pwd: '',
        capcha: '',
        text:''
    }
    componentDidMount() {
        this.getCapcha()
    }
    getCapcha = () => {
        getCapcha().then(res => {
            if (res.code == 1) {
                this.setState({
                    text: res.data
                })
            }
        })
    }
    userlogin = () => {
        let {username,pwd,capcha}=this.state;
        userLogin({
            username:username,
            password:pwd,
            captcha:capcha
        }).then(res=>{
            if(res.code==1){
                alert('登陆成功')
                localStorage.setItem('token',res.token)
                this.props.history.push('/home')
            }else{
                console.log(res.msg)
            }
        })
    }
    render() {
        let {text} = this.state;
        return (
            <div className='login'>
                <Header style={{ background: '#333333' }} title='登录' />
                <section>
                    <div className='dialog'>
                        <p><span>用户名：</span><input type='text'  onChange={(e) => {
                            this.setState({ username: e.target.value })
                        }} /></p>
                        <p><span>密码：</span><input type='password' onChange={(e) => {
                            this.setState({ pwd: e.target.value })
                        }} /></p>
                        <p><span>验证码：</span><input type='text'  onChange={(e) => {
                            this.setState({ capcha: e.target.value })
                        }} /></p>
                        <p dangerouslySetInnerHTML={{__html:text}} onClick={this.getCapcha}></p>
                        <p>
                            <button onClick={() => { this.props.history.push('/register') }}>注册</button>
                            <button onClick={this.userlogin}>登录</button></p>
                    </div>
                </section>
            </div>
        )
    }
}
