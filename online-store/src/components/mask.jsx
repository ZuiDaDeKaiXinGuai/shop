import React, { Component, Children } from 'react'
import Animate from 'rc-animate'
import '../css/x-mask.css'
export class Mask extends Component {
    state = {
        style: {
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,.7)",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 9,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        loading: false
    }

    render() {
        let { style } = this.state
        let { loading, child,styles } = this.props;
        return (
            <Animate transitionName='fade'>
                {loading ? <div style={style}> {this.props.children} </div> || 'layer' : null}
            </Animate>
        )
    }

    componentDidMount(){
        this.setState({style:{...this.state.style,...this.props.styles}})
    }
}

export default Mask
