import React, { Component } from 'react'
import {ConnectedRouter as Router} from 'react-router-redux'
import {Provider} from 'react-redux'
import App from './components/App'
import store from './redux'
import history from './history'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Root extends Component {
    static propTypes = {

    };

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <DragDropContextProvider backend={HTML5Backend}>
                        <App />
                    </DragDropContextProvider>
                </Router>
            </Provider>
        )
    }
}

export default Root