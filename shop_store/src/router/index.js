import React from 'react'
import routes from './routes'
import {Route,Switch,Redirect,Router} from 'dva/router'
function setConfigRoute(routes){
  return  routes.map(item=>{
        if(item.children){
            return <Route path={item.path}   key={item.name} render={() => {
                    return <item.component  routerChild={item.children}></item.component>
                }}></Route>
        }else{
            return <Route path={item.path} component={item.component} key={item.name} ></Route>
        }
    })
    }
export default ({history,app})=>{
return <Router history={history}>
         <Switch>
            { setConfigRoute(routes) }
            <Redirect exact from='/' to='/home' />
         </Switch>
     </Router>
}