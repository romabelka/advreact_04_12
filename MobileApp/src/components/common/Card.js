import React, { Component } from "react"
import { View, StyleSheet } from "react-native"

class Card extends Component {
  static propTypes = {}

  render() {
    return <View style={styles.container}>{this.props.children}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    shadowColor: "#111",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 10,
    elevation: 3
  }
})

export default Card
