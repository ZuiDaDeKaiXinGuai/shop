import Home from '../pages/home/index'
import Detail from '../pages/detail/index'
import Shopcar from '../pages/shopcar/index'
import Login from '../pages/login/index'
import Register from '../pages/register/index'
let routes=[{
    path:'/home',
    name:'home',
    component:Home
},{
    path:'/detail',
    name:'detail',
    component:Detail
},{
    path:'/shopcar',
    name:'shopcar',
    component:Shopcar
},{
    path:'/login',
    name:'login',
    component:Login
},{
    path:'/register',
    name:'Register',
    component:Register
}]
export default routes;