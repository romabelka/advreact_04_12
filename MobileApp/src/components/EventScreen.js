import React, { Component } from "react"
import { View, Text, StyleSheet, Image, Button, Modal } from "react-native"

class EventScreen extends Component {
  static propTypes = {}

  state = {
    isOpen: true
  }

  render() {
    const { event } = this.props
    return (
      <View>
        <Modal visible={this.state.isOpen} onRequestClose={this.toggleOpen}>
          <View style={styles.modalContainer}>
            <Text>Are you sure?</Text>
            <Button title="Confirm" onPress={this.toggleOpen} />
            <Button title="Cancel" onPress={this.toggleOpen} />
          </View>
        </Modal>
        <Image
          source={{ uri: "http://lorempixel.com/300/200/technics" }}
          style={styles.image}
        />
        <Text style={[styles.title, styles.text]}>{event.title}</Text>
        <Text style={styles.text}>{event.where}</Text>
        <Text style={styles.text}>{event.when}</Text>
        <Text style={styles.text}>{event.url}</Text>
        <Button title="Delete" onPress={this.toggleOpen} />
      </View>
    )
  }

  toggleOpen = () =>
    this.setState((state, props) => ({ ...state, isOpen: !state.isOpen }))
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200
  },
  title: {
    fontWeight: "bold"
  },
  text: {
    color: "#FF0000"
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default EventScreen
