
import React, { Component } from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../utils/configure-store'
import { path } from '../routes'
//We work with `redux`, so our app will need a reducer
import mainReducer from '../reducers/index'
//We need to import the components attached to the routes
//`App` is our main component. It can contain for instance an application bar.
//It will embed all the other components, thanks to `react-router` mechanism.
import App from './app'
import  Authors from './authors'
import AuthorDetails from './author-details'
import AuthorNotFound from './author-not-found'
import Edition from './edition'
import EditionDetails from './edition-details'
import Redden from './redden'
import CorpusPicker from './corpus-picker'
import Visualisation from './visualisation'

//We need to create a store. `configureStore` add a little extra config to 
//allow to work with asyncrhonous actions and to use the redux dev tools.
const store = configureStore(mainReducer)

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            {/* default component if the route does not match any over
                route */}
            <IndexRoute component={CorpusPicker} />
            <Route path=":corpusId" component={Visualisation}>
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}
