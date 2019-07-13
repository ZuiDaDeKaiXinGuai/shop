import dva from 'dva';
import './assets/index.scss'
import './utils/flexiable'
import createHistory from 'history/createBrowserHistory'
import ROUTE from './router/index'
import Modules from "./modules/index"
const app=dva({
     history:createHistory()
});

Modules(app)

app.router(ROUTE)

app.start('#root')