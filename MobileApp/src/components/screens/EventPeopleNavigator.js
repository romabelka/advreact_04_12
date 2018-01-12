import React, { Component } from "react"
import { TabNavigator } from "react-navigation"
import EventListScreen from "./events/EventList"
import PeopleListScreen from "./people/PeopleList.js"

export const TabNavigation = TabNavigator({
  eventList: {
    screen: EventListScreen
  },
  peopleList: {
    screen: PeopleListScreen
  }
})

export default class EventPeopleNavigator extends Component {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  render() {
    return <TabNavigation />
  }
}
