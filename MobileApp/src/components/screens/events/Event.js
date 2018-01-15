import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {inject, observer} from 'mobx-react'
import Event from '../../events/EventScreen'

@inject('events') @observer
class EventListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'event'
    }

    render() {
        return <Event event = {this.props.events.entities[this.props.navigation.state.params.uid]}/>
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen