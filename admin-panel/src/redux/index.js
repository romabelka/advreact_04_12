import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware, routerMiddleware(history), logger))

sagaMiddleware.run(saga)

//dev only
window.store = store

export default store