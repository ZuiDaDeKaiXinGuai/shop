import React, { Component } from 'react'

export default class Detail extends Component {
    componentDidMount() {
    }
    render() {
        let {item}= this.props.location.state ;
        return (
            <div>
               <span>{item.product_name}</span>
            </div>
        )
    }
}
