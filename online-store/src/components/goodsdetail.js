import React,{Component} from 'react'
import '../css/x-goodsdetail.css'
import Checkbox from './checkbox'


export default class Goodsdetail extends Component{
    render(){
        return (
            <div className='goodsdetail'>
                <div className='goods'>
                <div><Checkbox name='' onChange={(checked,name)=>{console.log(checked,name)}}/>
                <img src={require('../images/product.png')} />
                <h4>喵掌柜香辣小鱼干</h4></div>
                <i className='iconfont icon-angle-right'></i>
                </div>
                <div className='content'>
                <p><span className='goodstitle'>商品编号</span>：<span>XW41241123241255</span></p>
                <p><span className='goodstitle'>重量</span>：<span>40G</span></p>
                <p><span className='goodstitle'>售价</span>：<span>2.00</span></p>
                </div>   
            </div>
        )
    }
}