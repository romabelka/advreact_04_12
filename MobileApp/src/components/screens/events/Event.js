import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import Event from '../../events/EventScreen'
import {data} from '../../../fixtures'

class EventListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'event'
    }

    render() {
        return <Event event = {data.events[this.props.navigation.state.params.uid]}/>
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen