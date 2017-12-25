import React from 'react'
import {Image, View} from 'react-native'
import SignIn from './src/components/SignIn'
//import HelloWorld from './src/HelloWorld'
import EventScreen from './src/components/EventScreen'
import EventList from './src/components/EventList'
import {eventList} from './src/fixtures'

export default class App extends React.Component {
    render() {
        return (
            <View style = {styles.container}>
                <Image source = {require('./assets/image/logo.png')}
                       resizeMode = {Image.resizeMode.contain}
                />
                <EventList events = {eventList}/>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: 100
    }
}
