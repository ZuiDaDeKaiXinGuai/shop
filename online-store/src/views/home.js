import React, { Component } from 'react';
import Header from '../components/header'
import '../css/x-home.module.css'
class App extends Component {
    state = {

    }
    render() {
        return <div className='app'>
            <Header id="1" style={{background:'#333333'}} title='店铺首页' />
            <header>
                <span className='iconfont icon-dingwei1'></span>
                <span>请选择配送地址</span>
            </header>
            <div className='wrapper'>
                <div className='store'>
                    <dl>
                        <dt><img alt='' /></dt>
                        <dd>
                            <p>喵掌柜杂货铺 <span style={{ color: 'orange' }}>（已打烊）</span></p>
                            <p><span style={{ color: 'green', border: '.01rem solid green', fontSize: '.1rem', padding: '1px' }}>包邮</span> <span style={{ color: '#ccc', fontSize: '12px' }}>满49包邮</span></p>
                        </dd>
                    </dl>
                    <div className='like'>
                        <span>关注</span>
                    </div>
                </div>
            </div>
            <footer>
                <div>
                    <i className='iconfont icon-shouye'></i>
                    <span>首页</span>
                </div>
                <div>
                    <i className='iconfont icon-gouwuche'></i>
                    <span>购物车</span>
                </div>
                <div>
                    <i className='iconfont icon-wode'></i>
                    <span>我的</span>
                </div>
            </footer>
        </div>
    }
}
export default App;