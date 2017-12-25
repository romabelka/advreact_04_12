import React from 'react'
import { Text, View } from 'react-native'
import SignIn from './src/components/SignIn'
//import HelloWorld from './src/HelloWorld'
import EventScreen from './src/components/EventScreen'
import {eventList} from './src/fixtures'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <EventScreen event = {eventList[0]} />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
