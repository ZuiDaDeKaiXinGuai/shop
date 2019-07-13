import React, { Component } from "react";
import {withRouter} from 'dva/router'

export class Header extends Component {
  render() {
    let { style, id,title,ind } = this.props;
    return (
      <div className='top' style={style}>
          {!id && (
            <header style={style}  >
              <div className='left'>
                <i className="icon iconfont icon-zuojiantou-01" onClick={()=>{this.props.history.go(-1)}}/>
                <span></span>
              </div>
              <p style={style}>{title}</p>
              <div className='right'>
                {ind?"添加平台商品":<i className="icon iconfont icon-gengduo-01" />}
              </div>
            </header>
          )}
          {id && (
            <header style={style} >
              <div className='left'>
                <i className="icon iconfont icon-fangdajing" />
              </div>
              <p>{title}</p>
              <div className='right'>
                <i className="icon iconfont icon-xiaoxi"></i>
              </div>
            </header>
          )}
   
      </div>
    );
  }
}

export default withRouter(Header);
