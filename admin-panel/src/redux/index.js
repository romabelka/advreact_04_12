import {createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)
);

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

if (process.env.NODE_ENV !== 'production') {
    window.store = store;
}

export default store