import React, { Component } from 'react'
import Header from "../components/header"
import Mask from "../components/mask"
import Picker from "../components/picker"
import {connect} from "dva"
import stores from "../css/store.module.css"
import {storeList, mystore} from "../services/index"

import '../models/app';
export class Store extends Component {
    state = {
        style: {
            background: "#F2922F",
        },
        title:"海淀区社区派件配送…",
        count:3,
        mask_open:true,
        open:false,
        typearr:[],
        text:"请选择店铺",
        storeid:null
    }
    render() {
        let {style,title,count,mask_open,open,typearr,text}=this.state

        let { store_data } = this.props
        return (
            <div className={stores.home}>
                <Header style={style} id={1} title={title}></Header>
                <div className={stores.head}>
                    <dl>
                        <dt>
                        </dt>
                        <dd>
                            <p>13800002222</p>
                            <span>高级管理</span>
                            <b style={{ color: "#fff", marginLeft: "0.5rem", fontSize: "0.28rem" }} onClick={() => this.props.history.push("/addstore")}>创建店铺</b>
                        </dd>
                    </dl>
                </div>
                <div className={stores.home_p} style={{zIndex:mask_open?"20":"0"}} onClick={this.p.bind(this,)}>
                    <p >{text}</p>
                </div>
                <section className={stores.section}>
                    <div className={stores.last}>
                        {store_data && store_data.map((item, i) => {
                            return <p className={stores.boxs} key={i} onClick={this.click.bind(this, i, item)} style={{ zIndex: count == i ? "99" : "0" }}>
                                <i className="icon iconfont icon-xiaoxi"></i>
                                <span>{item.text}</span>
                            </p>
                        })}
                    </div>
                </section>
                {/* pickerdata={typearr} callback={} */}
                <Picker loading={open} styles={{zIndex:99}} pickerdata={typearr} callback={this.callback}></Picker>
                <Mask loading={mask_open}></Mask>
            </div>
        )
    }
    componentWillMount(){
        let open=localStorage.getItem("count")?false:true
        this.setState({mask_open:open})
        
    }
    componentDidMount(){
        this.props.dispatch({type:"app/storeData"})
        storeList({},{authorization:localStorage.getItem("token")}).then(res=>{
            let arr=res.result.filter(item=>item.uid===localStorage.getItem("token"))
            this.setState({typearr:arr})
        })
             
        mystore({},{authorization:localStorage.getItem("token")}).then(res=>{
        })
    }
    com() {
        let open = ++this.props.location.search.split("=")[1]
        localStorage.setItem("count", open)
    }
    click = (i, item) => {
        let { mask_open } = this.state
        if (mask_open) {
            if (i < 5 && i >= 3) {
                return this.setState({ count: ++i })
            }
            if (i === 5) {
                this.setState({ mask_open: false })
                localStorage.setItem("count", "1")
            }
        } else {
            //点击跳路由
            let {storeid}=this.state
           storeid?this.props.history.push({pathname:item.path,state:{sid:storeid}}):alert("请选择您要去的店铺")
        }
    }
    p=()=>{
        console.log(1)
        this.setState({open:true})
    }
    callback=(s,storeid)=>{
        this.setState({text:s,open:false,storeid})
    }
}

export default connect((state) => {
    return {
        store_data: state.app.store_data
    }
})(Store)