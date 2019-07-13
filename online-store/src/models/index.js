import store from './store'
import user from './user'
import moduleapp from './app'
export default (app) => {
    app.model(store);
    app.model(user);
    app.model(moduleapp)
}