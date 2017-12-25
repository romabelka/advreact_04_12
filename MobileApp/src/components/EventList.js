import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import Card from './common/Card'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <ScrollView>
                <View>
                    {this.props.events.map(event => (
                        <Card>
                            <Text>{event.title}</Text>
                        </Card>
                    ))}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList