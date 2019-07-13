import React, { Component } from 'react'
import login from "../css/g-login.module.css"
import Button from "../components/button"
export class Login extends Component {
    constructor(props){
        super(props)
        this.style={
            width:"2.08rem",
            height:"0.54rem",
            borderRadius:"0.1rem",
            background:"#ccc",
            textAlign:"center",
            lineHeight:"0.54rem"
        }
        this.state={
            user:'',
            pwd:''
        }
    }
    render() {
        let{user,pwd}=this.state
        return (
            <div className={login.login}>
                <div className={login.top}>
                    指尖杂货铺登陆
                </div>
                <section style={{'background':'#EEE'}}>
                    <div className={login.box}>
                        <p> <i class="icon iconfont icon-user"></i>登陆</p>
                        <div>
                            <span>账号：</span>
                            <input type="text" onChange={(e)=>this.setState({user:e.target.value})} placeholder="请输入账号"/>
                        </div>
                        <div>
                            <span>密码：</span>
                            <input type="password" onChange={(e)=>this.setState({pwd:e.target.value})} placeholder="请输入密码"/>
                        </div>
                        <div className={login.button}>
                            <Button title="登陆" style={this.style} id="3" item={{user,pwd}}></Button>
                            <Button title="注册" style={this.style} id="4"></Button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Login
