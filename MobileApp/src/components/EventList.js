import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView, SectionList } from "react-native"
import Card from "./common/Card"

class EventList extends Component {
  static propTypes = {}

  render() {
    return (
      <ScrollView>
        <View>
          <SectionList
            keyExtractor={item => item.uid}
            renderItem={({ item }) => {
              return (
                <Card key={item.uid}>
                  <Text>{item.title}</Text>
                </Card>
              )
            }}
            renderSectionHeader={({ section }) => {
              return <Text key={section.title}>{section.title}</Text>
            }}
            sections={this.mapEvents()}
          />
        </View>
      </ScrollView>
    )
  }

  mapEvents = () => {
    return [...new Set(this.props.events.map(e => e.title[0]))]
      .sort()
      .map(t => ({
        title: t,
        data: this.props.events.filter(e => e.title.startsWith(t))
      }))
  }
}

const styles = StyleSheet.create({})

export default EventList
