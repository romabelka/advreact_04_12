import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { MapView, Permissions, Location } from 'expo'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

@observer
class EventMap extends Component {
    static propTypes = {

    };

    @observable permissionAsked = false
    @observable permissionGranted = false
    @observable coords = null

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.LOCATION)
        this.grantPermission(status)
        const location = await Location.getCurrentPositionAsync()
        this.setLocation(location)
    }

    @action grantPermission(status) {
        this.permissionAsked = true
        this.permissionGranted = status === 'granted'
    }

    @action setLocation(location) {
        this.coords = location.coords
    }

    render() {
        if (!this.permissionAsked) return <Text>Not asked</Text>
        if (!this.permissionGranted) return <Text>Access denied</Text>
        if (!this.coords) return null
        return (
            <MapView
                style = {styles.container}
                initialRegion = {{
                    ...this.coords,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.5
                }}
            >
                <MapView.Marker coordinate = {this.coords} title = 'hello conf'/>
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default EventMap