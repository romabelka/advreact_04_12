import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import EventList from '../../events/EventList'
import {observer, inject} from 'mobx-react'

@inject('events') @observer
class EventListScreen extends Component {
    static navigationOptions = () => {
        return {
            tabBarLabel: 'Events'
        }
    }

    componentDidMount() {
        this.props.events.getEventList()
    }

    render() {
        if (this.props.events.loading || !this.props.events.loaded) {
            return <View><Text>Loading...</Text></View>
        }

        return <EventList events = {this.props.events.list} onEventPress = {this.navigateToEvent}/>
    }

    navigateToEvent = ({ uid }) => {
        this.props.navigation.navigate('event', { uid })
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen
