import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'

export default class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    render() {
        const {email, password} = this.state
        return (
            <View style = {styles.container}>
                <View>
                    <Text style = {styles.text}>Email:</Text>
                    <TextInput value = {email}
                               onChangeText = {this.handleEmailChange}
                               keyboarType = 'email-address'
                               style = {styles.input}
                    />
                </View>
                <View>
                    <Text style = {styles.text}>Password:</Text>
                    <TextInput value = {password}
                               onChangeText = {this.handlePasswordChange}
                               secureTextEntry
                               style = {styles.input}
                    />
                </View>
                <TouchableOpacity onPress = {this.handleSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleEmailChange = email => this.setState({ email })
    handlePasswordChange = password => this.setState({ password })

    handleSubmit = () => {
        console.log('---', this.state)
    }
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