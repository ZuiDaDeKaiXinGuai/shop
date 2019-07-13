import React, { Component } from 'react'
import Header from '../components/header'
import '../css/x-typeslist.css'
import Typesonly from '../components/typesonly'
import Mask from '../components/mask'
import { addType, typesList, delType } from '../services/index'
export default class Typeslist extends Component {
    state = {
        loading: false,
        typename: '',
        typeslist: []
    }
    componentDidMount() {
        this.updateTypelist()
    }
    updateTypelist() {
        typesList({
            store_id: '1e01685654c1cb5672e896c58f011dbf'
        }, {
                'authorization': localStorage.getItem('token')
            }).then(res => {
                console.log(res)
                if (res.code == 1) {
                    this.setState({
                        typeslist: res.result
                    })
                }
            })
    }
    deleteTypelist(id) {
        delType({ cat_id: id }, {
            'authorization': localStorage.getItem('token')
        }).then(res => {
            if (res.code == 1) {
                typesList({
                    store_id: '1e01685654c1cb5672e896c58f011dbf'
                }, {
                        'authorization': localStorage.getItem('token')
                    }).then(res => {
                        if (res.code == 1) {
                            this.setState({
                                typeslist: res.result
                            })
                        }
                    })
            }
        })
    }
    cancle() {
        this.setState({
            loading: false
        })
    }
    confirm() {
        this.setState({
            loading: false
        })
        addType({
            store_id: '1e01685654c1cb5672e896c58f011dbf',
            cat_name: this.state.typename
        }, {
                'authorization': localStorage.getItem('token')
            }).then(res => {
                if (res.code == 1) {
                    this.updateTypelist()
                }
            })
    }
    render() {
        return (
            <div className='typeslist'>
                <Header style={{ background: '#fff', color: '#000' }} title={'分类列表'} />
                <section>
                    {this.state.typeslist.map(item => <Typesonly
                        key={item.cat_code} item={item} fallback={(id) => { this.deleteTypelist(id) }}
                    />)}
                </section>
                <footer><button onClick={() => {
                    this.setState({
                        loading: true
                    })
                }}>添加分类</button></footer>
                <Mask loading={this.state.loading} title='' >
                    <div className='cll_dialog'>
                        <div className='cll_dialog_div'>
                            <p className='cll_title'>填写分类名称</p>
                            <div className='cll_con'>
                                <input type='text' placeholder='填写分类名称' onChange={(e) => {
                                    this.setState({ typename: e.target.value })
                                }} />
                            </div>
                            <p>
                                <span onClick={this.cancle.bind(this)}>取消</span>
                                <span onClick={this.confirm.bind(this)}>确定</span>
                            </p>
                        </div>
                    </div>
                </Mask>
            </div>
        )
    }
}