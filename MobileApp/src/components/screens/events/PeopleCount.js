import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {observer} from 'mobx-react'

@observer
class PeopleCount extends Component {
    static propTypes = {
        event: PropTypes.object
    };

    componentDidMount() {
        this.peopleLength = this.props.event.people.length
    }

    render() {
        return (
            <View>
                {this.peopleLength}
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default PeopleCount