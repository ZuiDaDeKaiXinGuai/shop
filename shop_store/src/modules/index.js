import getIndlist from "./home/index.jsx"
import shopcar from './shopcar/index'
export default (app)=>{
    app.model(getIndlist)
    app.model(shopcar)
}