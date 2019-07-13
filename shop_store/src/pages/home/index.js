import React, { Component } from 'react'
import './index.scss'
import Header from '../../components/header/index'
import { connect } from 'dva'
import Footer from '../../components/footer/index'
import { getHomeList, getStoreinfo } from '../../services/index'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabbar: [{
                title: '热卖商品',
                id: '1'
            }, {
                title: '店家推荐',
                id: '2'
            }, {
                title: '跳楼销售',
                id: '3'
            }],
            goodslist: [],
            wrapHeight: '',
            scrolltop: 0,
            isCurrent: false
        }
        this.scroller = React.createRef();
        this.winScroll = React.createRef()
        this.contentHeight = 0;
        this.page = 1;
    }
    componentDidMount() {
        this.contentHeight = this.scroller.current.offsetHeight
        let currentTop = localStorage.getItem('scrolltop');
        if (currentTop) {
            this.winScroll.current.scrollTop = Number(currentTop);
        }
        if (this.props.homelist.list.length > 0) return
        this.gethomeList()
    }
    componentDidUpdate() {
        this.contentHeight = this.scroller.current.offsetHeight
    }
    gethomeList(page = 1) {
        getStoreinfo({ page: page }).then(res => {
            if (res.code == 1) {
                this.props.dispatch({
                    type: 'homelist/getgoodslist',
                    payload: { list: res.data }
                })
            }
        })
    }
    stopbind=(item,e)=>{
        e.stopPropagation();
        console.log(item)
        if(localStorage.getItem('token')){
        this.props.dispatch({
                    type:'shopcar/AsynAddshopcar',
                    payload:{
                        token:localStorage.getItem('token'),
                        goods_id:item.product_id,
                        price:item.price.original_price,
                        count:1,
                        sku:''
                    }
                })
        }else{
            alert('请先登录')
            this.props.history.push('/login')
        }
    }
    scrollbind(e) {
        let { wrapHeight, scrolltop, isCurrent } = this.state;
        this.setState({
            wrapHeight: this.winScroll.current.offsetHeight,
            scrolltop: e.target.scrollTop
        })
        localStorage.setItem('scrolltop', scrolltop)
        if (scrolltop + wrapHeight > this.contentHeight - 50 && !isCurrent) {
            this.setState({ isCurrent: true })
            this.gethomeList(++this.page)
        } else {
            this.setState({ isCurrent: false })
        }
    }
    render() {
        let { tabbar, scrollbind } = this.state;
        let { list } = this.props.homelist;
        return <div className='app'>
            <Header id='1' style={{ background: '#333333' }} title='店铺首页' />
            <header>
                <span className='iconfont icon-dingwei1'></span>
                <span>请选择配送地址</span>
            </header>
            <section onScroll={this.scrollbind.bind(this)} ref={this.winScroll}>
                <div className='wrapper' ref={this.scroller}>
                    <div className='store'>
                        <dl>
                            <dt><img src={require('../../assets/images/shoplogo.png')} alt='' /></dt>
                            <dd>
                                <p>喵掌柜杂货铺 <span style={{ color: 'orange' }}>（已打烊）</span></p>
                                <p><span
                                    style={{ color: 'green', border: '.01rem solid green', fontSize: '.1rem', padding: '1px' }}>包邮</span>
                                    <span
                                        style={{ color: '#ccc', fontSize: '12px' }}
                                    >满49包邮</span></p>
                            </dd>
                        </dl>
                        <div className='like'>
                            <img src={require("../../assets/images/like.png")} alt='' />
                        </div>
                    </div>
                    <div className='banner'>
                        <img src={require('../../assets/images/banner-1.png')} alt='' />
                    </div>
                    <div className='tabbanner'>
                        {
                            tabbar.map(item => <div className='ban' key={item.id}>{item.title}</div>)
                        }
                    </div>
                    <div className='goodslist'>
                        {
                            list && list.map((item, index) => {
                                return <div key={index} className='oneGood'
                                    onClick={
                                        () => { this.props.history.push({ pathname: `/detail`, state: { item: item } }) }
                                    }>
                                    <img src={item.img_url} alt='' />
                                    <p>
                                        <span>{item.product_name}</span>
                                        <span>规格：120G</span>
                                        <span>￥{item.price.original_price}</span>
                                    </p>
                                    <button onClick={(e)=>this.stopbind(item,e)}>+</button>
                                </div>
                            })
                        }
                        <p>正在加载更多...</p>
                    </div>
                </div>
            </section>
            <Footer route={this.props.history}></Footer>
        </div>
    }
}
export default connect(state => {
    return { ...state }
})(App);