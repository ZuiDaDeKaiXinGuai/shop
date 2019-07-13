import React, { Component } from 'react'

export default class Footer extends Component {
    state = {
        tabbar: [{
            title: '首页',
            iconfont: 'iconfont icon-shouye',
            choose: true,
            path: '/home'
        }, {
            title: '购物车',
            iconfont: 'iconfont icon-gouwuche',
            choose: false,
            path: '/shopcar'

        }, {
            title: '我的',
            iconfont: 'iconfont icon-wode',
            choose: false,
            path: '/wode'

        }]
    }
    render() {
        let { tabbar } = this.state;
        return (
            <footer>
                {tabbar.map((item, index) => <div key={index} onClick={async () => {
                    let arr = [...tabbar];
                    arr.map(ind => ind.choose = false)
                    arr[index].choose = !arr[index].choose;
                    await this.setState({
                        tabbar: [...arr]
                    }, () => { console.log(this.state) })
                    await this.props.route.push(item.path)
                }} className={item.choose ? 'active' : ''}>
                    <i className={item.iconfont}></i>
                    <span>{item.title}</span>
                </div>)}

            </footer>
        )
    }
}
