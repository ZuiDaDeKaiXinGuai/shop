import Home from '../views/home'
import ConfigStore from '../views/configStore'
import ConfigUser from '../views/configUser'
import Setstore from '../views/setstore'
import Test from '../views/test'
import ProductList from '../views/productList'
import Store from '../views/store'
import Addshop from '../views/addshop'
import Login from '../views/login';
import Registered from "../views/registered"
import Addstore from "../views/addstore"
import Typeslist from '../views/typeslist'
import addStore from '../views/addstore'

let routes=[{//店铺首页
    path:'/store',
    name:'store',
    component:Store
},{
    path:'/home',
    name:'home',
    component:Home
},{
    path:'/configStore',
    name:'configStore',
    component:ConfigStore,
    children:[{
        path:'/configStore/test',
        name:'test',
        component:Test
    }]
},{
    path:'/configUser',
    name:'configUser',
    component:ConfigUser
},{
    path:'/addstore',
    name:'addstore',
    component:Addstore
},{//登陆界面
    path:'/login',
    name:'login',
    component:Login
},{//注册界面
    path:'/register',
    name:'register',
    component:Registered
},{//店铺设置
    path:'/setstore',
    name:'setstore',
    component:Setstore
},{//店铺端添加商品
    path:'/addshop',
    name:'addshop',
    component:Addshop
},{//商品列表
    path:'/productlist',
    name:'productlist',
    component:ProductList
},{//分类列表
    path:'/typeslist',
    name:'typeslist',
    component:Typeslist
},{//创建店铺
    path:'/addstore',
    name:'addstore',
    component:addStore
}]

export default routes;