import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'

@inject('auth') @observer
export default class SignIn extends Component {

/*
    componentWillReact() {
        console.log('---', 432, auth.user)
        if (auth.user) {
            this.props.navigation.navigate('eventList')
        }
    }

*/
    render() {
        const { auth } = this.props
        return (
            <View style = {styles.container}>
                <View>
                    <Text style = {styles.text}>Email:</Text>
                    <TextInput value = {auth.email}
                               onChangeText = {this.handleEmailChange}
                               keyboarType = 'email-address'
                               style = {styles.input}
                    />
                </View>
                <View>
                    <Text style = {styles.text}>Password:</Text>
                    <TextInput value = {auth.password}
                               onChangeText = {this.handlePasswordChange}
                               secureTextEntry
                               style = {styles.input}
                    />
                </View>
                <TouchableOpacity onPress = {auth.signIn}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    @action handleEmailChange = email => this.props.auth.email = email
    @action handlePasswordChange = password => this.props.auth.password = password
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold'
    },
    input: Platform.select({
        ios: {
            borderBottomWidth: 1
        },
        android: {

        }
    })
}