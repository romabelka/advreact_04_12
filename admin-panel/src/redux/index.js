import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';

import reducer from './reducer';
import history from '../history';

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const enhancer = composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history), logger)
);

const store = createStore(reducer, enhancer);

if (process.env.NODE_ENV !== 'production') {
    window.store = store;
}

export default store;
