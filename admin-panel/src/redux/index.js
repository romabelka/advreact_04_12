import {createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import history from '../history'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), logger)))

//dev only
window.store = store

export default store
