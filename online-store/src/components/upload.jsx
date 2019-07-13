import React,{Component} from 'react'
import upload from '../css/x-upload.css'
class Upload extends Component{
    state={
        isImage:false,
        url:'',
        img:null
    }
    getFile(e){
        e.persist()
        let FD=new FormData()
        FD.append('img',e.target.files[0])
        let {storeid}=this.props;
        fetch(`/upload?store_id=${storeid}`,{
            method:'post',
            body:FD,
            headers:{'authorization': ''}
            }).then(res=>res.json())
            .then(res=>{
                if(res.code===1){
                 let  url='http://148.70.121.59:9001'+res.url[0].url
                 this.setState({
                     isImage:true,
                     url
                 })
                 let {callback}=this.props;
                 callback && callback(res.url[0].url)
                }
            })
    }
    render(){
        let {callback}=this.props;
        //classname='uploading'小框 ，'uploadings'大框 ,'load'公共样式
        let {classname,title}=this.props
        let {isImage,url}=this.state
        return (
            isImage?
            (<div className={classname}><img src={url} style={{width:'100%',height:'100%'}}/></div>):(<div className={classname} style={{position:'relative'}}>
            <input type='file' style={{position:'absolute',left:'50%',right:'50%',width:'.4rem',opacity:'0'}} onChange={this.getFile.bind(this)}/>
            <span style={{fontSize:'.4rem'}}>+</span>
            <span>上传{title}</span>
            </div>)
        )
    }

}
export default Upload;