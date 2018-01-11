import React from 'react'
import './src/fbConfig'
import AppNavigator from './src/AppNavigator'
import {useStrict} from 'mobx'
import {Provider, observer} from 'mobx-react'
import stores from './src/stores'
import {addNavigationHelpers} from 'react-navigation'
useStrict(true)

@observer
export default class App extends React.Component {
    render() {
        return <Provider {...stores}>
            <AppNavigator navigation = {addNavigationHelpers(stores.navigation.config)}/>
        </Provider>
    }
}
