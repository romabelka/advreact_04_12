import {createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import history from '../history'

const store = createStore(reducer, compose(
  applyMiddleware(thunk, routerMiddleware(history), logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

//dev only
window.store = store

export default store