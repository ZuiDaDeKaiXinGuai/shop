import React, { Component } from 'react'
import {Routerlist} from '../router/index'
export default class configStore extends Component {
    render() {
        return (
            <div>
                this is pages in coonfigStore
                 {Routerlist(this.props.routerChild)}
            </div>
        )
    }
}
