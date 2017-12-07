import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Auth from './routes/auth'

class App extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Hello world</h1>
                <Route path='/auth' component={Auth}/>
            </div>
        )
    }
}

export default App