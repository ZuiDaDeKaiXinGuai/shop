import Mask from './mask';
import React,{Component} from 'react';

export default class Loading extends Component{
    componentDidMount(){
        let {svg}=this.props;
        let load=document.createElement('div');
        load.innerHTML='svg';
    }
    render(){
    return (
        <Mask loading={this.props.loading}>
              <div dangerouslySetInnerHTML={{__html:this.props.svg}} style={{width:'2rem',height:'2rem'}}></div>
        </Mask>
    )
}
}