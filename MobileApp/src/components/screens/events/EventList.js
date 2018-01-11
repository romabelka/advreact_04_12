import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import EventList from '../../events/EventList'
import {eventList} from '../../../fixtures'

class EventListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'event list'
    }

    render() {
        return <EventList events = {eventList} onEventPress = {this.navigateToEvent}/>
    }

    navigateToEvent = ({ uid }) => {
        this.props.navigation.navigate('event', { uid })
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen