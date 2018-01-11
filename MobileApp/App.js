import React from 'react'
import AppNavigator from './src/AppNavigator'
import {useStrict} from 'mobx'
useStrict(true)

export default class App extends React.Component {
    render() {
        return <AppNavigator />
    }
}
