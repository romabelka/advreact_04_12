import React, { Component } from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

class EventScreen extends Component {
    static propTypes = {

    };

    render() {
        const {event} = this.props
        return (
            <View>
                <Image source = {{ uri: 'http://lorempixel.com/300/200/technics'}} style = {styles.image} />
                <Text style = {[styles.title, styles.text]}>{event.title}</Text>
                <Text style = {styles.text}>{event.where}</Text>
                <Text style = {styles.text}>{event.when}</Text>
                <Text style = {styles.text}>{event.url}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200
    },
    title: {
        fontWeight: 'bold'
    },
    text: {
        color: '#FF0000'
    }
})

export default EventScreen
