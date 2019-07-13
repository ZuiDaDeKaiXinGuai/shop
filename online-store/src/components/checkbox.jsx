import React, { Component } from 'react'
import '../css/x-checkbox.css'
import {bool} from 'prop-types'
class Checkbox extends Component {
    state = {
        style: {
            width: '.32rem',
            height: '.32rem',
            border: '.01rem solid #999',
            display: 'inline-block'
        },
        classname: 'checkbox',
    }
    onCheck = () => {
        this.setState(state => {
            return {
                checked: state.classname === 'checkbox' ? 'true' : 'false',
                classname: state.classname === 'checkbox' ? 'checkbox checked' : 'checkbox',
            }
        }, () => {
            let {onChange,name}=this.props;
            let checked = false;
            checked = this.state.classname === 'checkbox' ? 'false' : 'true';
            onChange(checked,name)
        })
    }
    componentDidMount(){
       let  {circle,checked}=this.props;
       let obj={
        width: '.32rem',
        height: '.32rem',
        border: '.01rem solid #999',
        borderRadius:'50%'
    }
      circle&& this.setState({
           style: obj
       })
       checked&&this.setState({ checked: this.state.classname === 'checkbox checked'})
    }
    render() {
        return (
            <span style={this.state.style} className={this.state.classname} onClick={this.onCheck.bind(this)} ></span>
        )
    }
}
Checkbox.propTypes={
    name:'string'.required,
    checked:bool
}
export default Checkbox;