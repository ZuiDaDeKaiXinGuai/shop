import React from 'react'
import { Route, Router, Switch ,Redirect} from 'dva/router'
import routes from './routes'

function Routerlist(routes) {
    if(localStorage.getItem("token")){
        return routes.map(item => {
            if (item.children) {
                return <Route path={item.path}   key={item.name} render={() => {
                    return <item.component  routerChild={item.children}></item.component>
                }}></Route>
            }
            return <Route path={item.path}  component={item.component} key={item.name}></Route>
        })
    }else{
        let arr=routes.filter(item=>item.path=="/login"||item.path=="/register")
        return arr.map((item,i)=>{
            if (item.children) {
                return <Route path={item.path}   key={item.name} render={() => {
                    return <item.component  routerChild={item.children}></item.component>
                }}></Route>
            }
            return <Route path={item.path}  component={item.component} key={item.name}></Route>
        })
    }
}
let ROUTE=({history,app})=> {
    return  <Router history={history}>
         <Switch>
         { Routerlist(routes)}
         {localStorage.getItem("token")?<Redirect from='/' to='/store' exact></Redirect>:<Redirect from='/' to='/login'></Redirect>}
         </Switch>
     </Router>
}
export {Routerlist}

export default ROUTE;

