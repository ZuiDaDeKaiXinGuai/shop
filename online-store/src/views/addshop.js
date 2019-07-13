import React, { Component } from 'react'
import Header from "../components/header"
import Button from "../components/button"
import  Upload from "../components/upload"
import addshop from "../css/addshop.module.css"
import { Select } from 'antd';
const { Option } = Select;
export class Addshop extends Component {
    state={
        style:{
            background:"#fff",
            color:"#000"
        },
        title:"添加商品",
        ind:1,
        sid:''
    }
    applyToshelf(){
        
    }
    componentDidMount(){
        this.setState({sid:this.props.location.state.sid})
    }
    render() {
        let{style,title,ind}=this.state
        return (
            <div className={addshop.wrap}>
                <Header style={style} title={title} ind={ind}></Header>
                <section>
                <div className={addshop.information}>
                    <div className={addshop.mation}>
                        <span>商品名称</span>
                        <input type="text" placeholder="选择商品名称"/>
                    </div>
                    <div className={addshop.mation}>
                        <span>选择分类</span>
                        <input type="text" placeholder="选择商品名称"/>
                    </div>
                    <div className="kg">
                        <div className={addshop.mation}>
                            <span>重 <b>拉</b><b>拉</b>量</span>
                            <input type="text" placeholder="选择商品名称"/>
                        </div>
                        <div className={addshop.mation}>
                        <span>商品售价</span>
                        <input type="text" placeholder="请输入商品售价"/>
                    </div>
                    <div className={addshop.mation}>
                        <span>商品条码</span>
                        <input type="text" placeholder="请输入商品条码（选填）"/>
                    </div>
                    </div>
                </div>
                <div className={addshop.g_img}>
                        <p>商品图片</p>
                        <Upload classname="uploading load" title="图片" storeid={this.state.sid}></Upload>
                    </div>
                <div className={addshop.shopcar}>
                    <p>购物车图<span>（选填）</span></p>
                    <Upload classname="uploading load" title="图片" storeid={this.state.sid}></Upload>
                </div>
                <div className={addshop.shopxq}>
                    <p>商品详情</p>
                    <Upload classname="uploadings load" title="图片" storeid={this.state.sid}></Upload>
                </div>
                <div className={addshop.btn}>
                    <Button title="+添加SKY" style={{width:"2.08rem",height:"0.54rem",background:"#5ADAD0",borderRadius:"0.1rem",textAlign:"center",lineHeight:"0.54rem",color:"#fff"}}></Button>
                </div>
                </section>
                <footer> <button onClick={this.applyToshelf.bind(this)}>申请上架</button></footer>
            </div>
        )
    }
}

export default Addshop
