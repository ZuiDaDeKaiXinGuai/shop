import dva from 'dva';
// import './css/index.module.css';
import "./index.css"
import createHistory from 'history/createBrowserHistory'
import "./utils/flexiable"
// import 'antd/dist/antd.css';
import Moduleconfig from './models/index'
import ROUTE from './router/index'

// 1. Initialize
const app = dva({
    // history:createHistory()
});
 
// 2. Plugins
// app.use({});
 
// 3. Model
Moduleconfig(app)
// 4. Router
app.router(ROUTE);
 
// 5. Start
app.start('#root');