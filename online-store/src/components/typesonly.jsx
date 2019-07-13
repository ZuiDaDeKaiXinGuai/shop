import React, { Component } from 'react';
import '../css/x-typesonly.css'
import { typesList, delType } from '../services/index'
import Mask from '../components/mask'
export default class Typesonly extends Component {
    state = {
        loading: false
    }
    deleteType = () => {
        let { item } = this.props;
        this.setState({ loading: true })
    }
    cancle(id) {
        this.setState({
            loading: false
        })

    }
    confirm(id) {
        this.setState({
            loading: false
        })
        this.props.fallback(id)
    }
    render() {
        let { item, fallback } = this.props;
        return (
            <div className='typesonly'>
                <div className='names'>
                    <p style={{ fontSize: '.32rem' }}>分类名称:{item.cat_name}</p>
                    <p style={{ fontSize: '.24rem', color: '#999' }}>添加时间：2018-06-21</p>
                </div>
                <div className='types'>
                    <i className='icon iconfont icon-youhuiquan-geren-01'></i>
                    <i className='icon iconfont icon-shanchu-01' onClick={this.deleteType.bind(this)}></i>
                </div>
                <Mask title='确定删除吗？' loading={this.state.loading} fallback={() => { }}>
                    <div className='cll_dialog'>
                        <div className='cll_dialog_div'>
                            <p className='cll_title'>确定删除吗？</p>
                            <div className='cll_con'>
                            </div>
                            <p>
                                <span onClick={this.cancle.bind(this)}>取消</span>
                                <span onClick={this.confirm.bind(this, item.cat_id)}>确定</span>
                            </p>
                        </div>
                    </div></Mask>
            </div>
        )
    }
}