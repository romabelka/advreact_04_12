import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import history from '../history'
import {randomId} from './middlewares'

const store = createStore(reducer, applyMiddleware(thunk, routerMiddleware(history), randomId, logger))

//dev only
window.store = store

export default store