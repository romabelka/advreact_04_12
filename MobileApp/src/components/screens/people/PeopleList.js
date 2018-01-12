import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { observer, inject } from "mobx-react"

@inject("people")
@observer
class PeopleListScreen extends Component {
  static navigationOptions = () => {
    return {
      tabBarLabel: "People"
    }
  }

  componentDidMount() {
    this.props.people.getPersonList()
  }

  render() {
    if (this.props.people.loading || !this.props.people.loaded) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View>
        {this.props.people.list.map(p => <Text key={p.uid}>{p.email}</Text>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default PeopleListScreen
