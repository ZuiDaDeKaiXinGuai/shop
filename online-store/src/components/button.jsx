import React, { Component } from 'react'
import { withRouter } from "dva/router"
import { URLSearchParams } from 'url';
import { registered, login, createStore } from "../services/index"
export class Button extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        //id=1  注册接口
        //id=2  返回登录页
        //id=3  登陆接口
        //id=4  前往注册页面
        //id=5  创建店铺
        let { style, title, id, item } = this.props
        return (
            <p style={style} className="gxg_button" onClick={this.click.bind(this)}>{title}</p>
        )
    }
    click = () => {
        console.log(this.props)
        let { id, item } = this.props
        switch (id) {
            case "1":
                return registered({ user_name: item.user, user_pwd: item.pwd, phone: item.phone }).then(res => {
                    if (res.code == 1) {
                        alert(res.msg)
                        return this.props.history.push("/login");
                    } else {
                        alert(res.msg)
                    }
                })

            case "2":
                return this.props.history.push("/login");
            case "3":
                return login({ user_name: item.user, user_pwd: item.pwd }).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        alert(res.msg)
                        localStorage.setItem("token", res.token)
                        if(localStorage.getItem("token")){
                            this.props.history.push("/store")  
                        }else{
                            this.props.history.push("/login")  
                        }
                    } else {
                        alert(res.msg)
                    }

                   
                });
            case "4":
                return this.props.history.push("/register");
            case "5":
                return createStore({ idcard: item.idcard, store_name: item.store_name, cat_id: item.cat_id, cat: item.cat, sub_cat: item.sub_cat, uid: localStorage.getItem("token") }).then(res => {
                    console.log(res)
                    if (res.code === 1) {
                        alert(res.msg)
                        this.props.history.push("/store")
                    } else {
                        alert(res.msg || res.errors[0].message)
                    }
                })
        }
    }

    }

    export default withRouter(Button)
