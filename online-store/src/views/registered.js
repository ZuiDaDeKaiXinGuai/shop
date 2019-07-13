import React, { Component } from 'react'
import reges from "../css/g-registered.module.css"
import Button from "../components/button"

export class Registered extends Component {
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
            user:"",
            pwd:"",
            phone:""
        }
    }
    render() {
        let{user,pwd,phone}=this.state
        return (
            <div className={reges.reges}>
                <div className={reges.top}>
                    指尖杂货铺注册账号
                </div>
                <section>
                    <div className={reges.box}>
                        <p> <i class="icon iconfont icon-user"></i>注册</p>
                        <div>
                            <span>用户名：</span>
                            <input type="text" placeholder="请输入您的用户名" onChange={(e)=>{this.setState({user:e.target.value})}}/>
                        </div>
                        <div>
                            <span>密<b>啊</b>码：</span>
                            <input type="password" placeholder="请输入密码"  onChange={(e)=>{this.setState({pwd:e.target.value})}}/>
                        </div>
                        <div>
                            <span>手机号：</span>
                            <input type="text" placeholder="请输入您的手机号"  onChange={(e)=>{this.setState({phone:e.target.value})}}/>
                        </div>
                        <div className={reges.button}>
                            <Button title="注册" style={this.style} id="1" item={{user,pwd,phone}}></Button>
                            <Button title="返回" style={this.style} id="2"></Button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Registered
