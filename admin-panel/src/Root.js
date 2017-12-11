import React, { Component } from 'react'
import {ConnectedRouter as Router} from 'react-router-redux'
import {Provider} from 'react-redux'
import App from './components/App'
import store from './redux'
import history from './history'

class Root extends Component {
    static propTypes = {

    };

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        )
    }
}

export default Root