import React, { Component } from 'react'
import Header from "../components/header"
import addstore from "../css/addstore.module.css"
import Button from "../components/button"
export class Addstore extends Component {
    state={
        style:{
            background:"#000",
            color:"#fff"
        },
        addshops:{
            width:"2.8rem",
            height:"0.80rem",
            background:"#ccc",
            "textAlign":"center",
            "lineHeight":"0.8rem"
        },
        ind:1,
        idcard:"",
        store_name:"",
        cat_id:"",
        cat:"",
        sub_cat:""
    }
    render() {
        let {ind,style,addshops,idcard,store_name,cat_id,cat,sub_cat}=this.state
        return (
            <div className={addstore.app}>
                 <Header style={style} title="添加店铺" ind={ind}></Header>
                 <section>
                 <div className={addstore.mation}>
                        <span>身份证号</span>
                        <input type="text" placeholder="请输入身份证号" onChange={(e)=>{this.setState({idcard:e.target.value})}}/>
                    </div>
                    <div className={addstore.mation}>
                        <span>店铺名称</span>
                        <input type="text" placeholder="请输入店铺名称" onChange={(e)=>{this.setState({store_name:e.target.value})}}/>
                    </div>
                    <div className={addstore.mation}>
                        <span>一级分类id</span>
                        <input type="text" placeholder="请输入一级分类id" onChange={(e)=>{this.setState({cat_id:e.target.value})}}/>
                    </div>
                    <div className={addstore.mation}>
                        <span>一级分类</span>
                        <input type="text" placeholder="请输入一级分类" onChange={(e)=>{this.setState({cat:e.target.value})}}/>
                    </div>
                    <div className={addstore.mation}>
                        <span>二级分类列表</span>
                        <input type="text" placeholder="请输入二级分类列表" onChange={(e)=>{this.setState({sub_cat:e.target.value})}}/>
                    </div>
                   <div className={addstore.btns}>
                   <Button title="添加商品" style={addshops} item={{idcard,store_name,cat_id,cat,sub_cat}} id="5"></Button>
                   </div>
                 </section>
            </div>
        )
    }
}

export default Addstore
