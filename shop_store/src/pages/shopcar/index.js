import React, { Component } from 'react'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
export default class Shopcar extends Component {
    render() {
        return (
            <div className='app'>
                <Header style={{ background: '#333333' }} title='购物车' />
                <section> 购物车</section>

                <Footer route={this.props.history}></Footer>
            </div>
        )
    }
}
