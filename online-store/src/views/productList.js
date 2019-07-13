import React, { Component } from 'react'
import '../css/x-productlist.css'
import Header from '../components/header'
import Checkbox from '../components/checkbox'
import Goodsdetail from '../components/goodsdetail'
import {goodsList} from '../services/index'
import Loading from '../components/loading'

 class ProductList extends Component {
     state={
         loading:true
     }
     componentDidMount(){
        goodsList({store_id:'b24cf276e87dc7af441caa307743e055'},{
            authorization:'34567543'
        }).then(res=>{
            if(res.code==1){
                this.setState({
                    loading:false
                })
            }
        })
     }
    render() {
        return (
            <div className='productlist'>
            <Loading loading={this.state.loading} svg='<svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
            <circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"></circle>
              <circle fill="#fff" stroke="#e74c3c" stroke-width="3" cx="8" cy="54" r="6" transform="rotate(272.111 50 51.0235)">
                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite"></animateTransform>
              </circle>
            </svg>'>
            </Loading>
            <Header style={{ background: '#fff', color: '#000' }} title={'商品列表'} />
                <section>
                    <div className='navsearch'>
                        <div className='input'><input type='text' placeholder='请输入商品名称'/></div>
                    </div>
                    <Goodsdetail />
                    <Goodsdetail />
                </section>
                <footer>
                    <div style={{width:'50%'}}><Checkbox circle name='all' onChange={(checked,name)=>{console.log(checked,name)}}/>全选</div>
                    <button style={{background:'#999'}}>下架</button>
                    <button>上架</button>
                </footer>
            </div>
        )
    }
}
export default ProductList;