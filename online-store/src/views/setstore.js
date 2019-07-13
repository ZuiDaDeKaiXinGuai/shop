import React, { Component } from 'react'
import Header from '../components/header'
import Upload from '../components/upload'
import Checkbox from '../components/checkbox'
import '../css/x-setstore.css'
// import request from '../utils/request'
import { createStore, storeList, storeOrderList, setStore } from '../services/index'
import Picker from '../components/picker'
import Loading from '../components/loading'
export default class Setstore extends Component {
    state = {
        weekdate: [{
            id: 1,
            title: '星期一'
        }, {
            id: 2,
            title: '星期二'
        }, {
            id: 3,
            title: '星期三'
        }, {
            id: 4,
            title: '星期四'
        }, {
            id: 5,
            title: '星期五'
        }, {
            id: 6,
            title: '星期六'
        }, {
            id: 7,
            title: '星期日'
        }]
        ,
        imgarr: [1],
        isImage: false,
        tabList: [{
            src: './../images/bannertab-1.png',
            id: 0,
            isactive: true
        }, {
            src: './../images/bannertab-2.png',
            id: 1,
            isactive: false
        }],
        tabview: '',//首页风格
        pickerdata: [],
        loading: true,//控制loading页面
        open: false,//控制选择框
        storeName: '',
        lowerPrice: '',
        dispatchPrice: '30:00',
        startTime: '8:00',
        endTime: '22:00',
        dispatchTime: "30:00",
        store_id: '',//店铺id,
        type: '',
        businessTime: [],
        bannerList: [],
        loginimg:'',
       
    } 
    
    upload = (url) => {
        let {bannerList,loginimg}=this.state;

        bannerList.push({src:url})
        this.setState({bannerList:bannerList})
        this.setState(state => {
            let { imgarr } = this.state;
            imgarr.length < 3 && imgarr.push(imgarr.length + 1)
            return {
                imgarr
            }
        })
    }
    chooseStyle = (ind) => {
        //选择布局样式
        let newstate = this.state.tabList.map(item => {
            item.isactive = false
            return item
        })
        newstate[ind].isactive = true;
        this.setState({
            tabList: newstate,
            tabview: ind == '1' ? '横向布局' : '纵向布局'
        }, () => {
            console.log(this.state.tabview)
        })
    }
    chooseStyleview(e) {
        let { id } = e.target.dataset;
        this.chooseStyle(id)
    }

    savesetStore = () => {
        //保存店铺设置
        let { storeName, lowerPrice, dispatchPrice, store_id ,bannerList,loginimg,tabview} = this.state;
        setStore({
            banner: '',
            store_name: storeName,
            store_id: store_id,
            brand_name: '',
            business_time: '',
            bannerList:bannerList,
            loginimg:loginimg,
            indexstyle_id:tabview,
            dispatchPrice:dispatchPrice,
            logo:loginimg,
            affectedRows:'00'
        },{
            'Authorization':localStorage.getItem('token')
        })
        console.log(storeName, lowerPrice, dispatchPrice)
    }
    componentDidMount() {
        this.props.location.state && this.setState({ store_id: this.props.location.state.sid })
    }
    render() {
        let { storeName,
            lowerPrice,
            dispatchPrice,
            startTime,
            endTime,
            imgarr,
            weekdate,
            tabList,
            open,
            pickerdata,
            loading,
            dispatchTime,
            businessTime,
            type,
            store_id,
            bannerList,
            loginimg } = this.state;
        return (
            <div className='store'>
                <Header style={{ background: '#fff', color: '#000' }} title={'店铺设置'} />
                <section>
                    <div className='wrapper'>
                        <p>店铺LOGO</p>
                        <Upload
                            title='logo'
                            classname='uploading load'
                            storeid={store_id}
                            callback={(url) => {
                                this.setState({
                                    loginimg:url
                                })

                            }}
                        />
                        <p>店铺banner<span style={{ color: '#999' }}> (1-3张) </span></p>
                        {imgarr.length >= 2 ? null : <div className='uploadings'>
                            <img src={require("../images/banner-1.png")}
                                style={{ width: '100%', height: '100%', }} />
                        </div>}
                        {imgarr.map(item => <Upload
                            title='banner'
                            key={item}
                            classname='uploadings load'
                            storeid={store_id}
                            callback={this.upload.bind(this)}
                        />)}
                        <div className='effect'></div>
                        <div className='context'>
                            <div className='info'>
                                <span>店铺名称</span>
                                <input placeholder='请输入店铺名称' value={storeName}
                                    onChange={(e) => {
                                        this.setState({ storeName: e.target.value })
                                    }} />
                            </div>
                            <div className='info'>
                                <span>起送价格</span>
                                <input placeholder='请输入起送价格' value={lowerPrice}
                                    onChange={(e) => {
                                        this.setState({ lowerPrice: e.target.value })
                                    }} />
                            </div>
                            <div className='info'>
                                <span>配送费</span>
                                <input placeholder='请输入配送费' value={dispatchPrice}
                                    onChange={(e) => {
                                        this.setState({ dispatchPrice: e.target.value })
                                    }} />
                            </div>
                        </div>
                        <div className='weekdate'>
                            <p>营业周期</p>
                            <div className='weekCheck'>
                                {weekdate.map(item => {
                                    return <div key={item.id} className='weekopts'>
                                        <Checkbox
                                            name={item.title}
                                            onChange={(checked, name) => {
                                                checked ?
                                                    this.setState({ businessTime: businessTime + name }) :
                                                    this.setState({ businessTime: 'hhh' })
                                            }} />
                                        <span>{item.title}</span>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className='info'>
                            <span>营业时间</span>
                            <div>
                                <button className='picker'
                                    onClick={() => {
                                        this.setState({
                                            open: true,
                                            type: 'start',
                                            pickerdata: [{ title: '6:00', id: '0' },
                                            { title: '7:00', id: '1' },
                                            { title: '8:00', id: '2' },
                                            { title: '9:00', id: '3' }]
                                        })
                                    }}>
                                    {startTime}
                                </button>
                                <span style={{ color: '#999' }}>至</span>
                                <button className='picker'
                                    onClick={() => {
                                        this.setState({
                                            open: true,
                                            type: 'end',
                                            pickerdata: [{ title: '20:00', id: '0' },
                                            { title: '21:00', id: '1' },
                                            { title: '22:00', id: '2' },
                                            { title: '23:00', id: '3' }]
                                        })
                                    }}>
                                    {endTime}
                                </button>
                            </div>
                        </div>
                        <div className='info'>
                            <span>配送时效</span>
                            <div onClick={() => {
                                this.setState({
                                    open: true,
                                    type: 'dispatch',
                                    pickerdata: [{ title: '10:00', id: '0' },
                                    { title: '20:00', id: '1' },
                                    { title: '30:00', id: '2' },
                                    { title: '40:00', id: '3' }]
                                })
                            }}>{dispatchTime}<span className='iconfont icon-xiangxia'></span></div>
                        </div>
                        <div className='effect'></div>
                        <div className='bannertab'>
                            <p>首页风格</p>
                            <div className='bantabs'>
                                {tabList.map(item => <div className='tabopt' key={item.id}>
                                    <img src={require('../images/bannertab-1.png')}
                                        className={item.isactive ? 'active' : ''}
                                        onClick={this.chooseStyle.bind(this, item.id)}
                                        key={item.id} />
                                    <input type='radio'
                                        name='a'
                                        checked={item.isactive}
                                        onClick={this.chooseStyleview.bind(this)}
                                        data-id={item.id} />
                                </div>)}
                            </div>
                        </div>
                    </div>
                </section>
                <footer><button onClick={this.savesetStore}>保存</button></footer>
                <Picker
                    loading={open}
                    pickerdata={pickerdata}
                    callback={(title) => {
                        this.setState({ open: false })
                        if (title === undefined) {
                            return;
                        } else {
                            if (type === 'start') {
                                this.setState({
                                    startTime: title
                                })
                            } else if (type === 'end') {
                                this.setState({
                                    endTime: title
                                })
                            } else if (type === 'dispatch') {
                                this.setState({
                                    dispatchPrice: title
                                })
                            }
                        }
                    }} />
            </div>
        )
    }
}