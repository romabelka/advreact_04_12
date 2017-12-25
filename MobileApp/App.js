import React from 'react'
import { Text, View } from 'react-native'
import SignIn from './src/SignIn'
//import HelloWorld from './src/HelloWorld'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <SignIn />
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
