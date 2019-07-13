import React, { Component } from 'react';
import '../css/x-picker.css'
import Mask from './mask'
export default class Picker extends Component {
    state={
        loading:false,
        choose:''
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            loading:nextProps.loading
        })
    }
    render() {
        let {loading,pickerdata,callback,styles } = this.props;
       
        return (
            <Mask loading={loading} styles={styles}>
                <ul className='pickers'>
                    {pickerdata && pickerdata.map(item => <li onClick={()=>{
                        callback(item.title||item.store_name,item.store_id)
                    }} key={item.id||item.store_id}>{item.title||item.store_name}</li>)}
                    <li style={{marginTop:'.2rem'}} onClick={()=>{
                        callback()
                    }}>取消</li>
                </ul>
            </Mask>
        )
    }
}