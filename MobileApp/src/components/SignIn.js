import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'
import {observable, computed, action} from 'mobx'
import {observer} from 'mobx-react'

@observer
export default class SignIn extends Component {
    @observable email = ''
    @observable password = ''
    @computed get name() {
        return this.email.split('@')[0] + this.password.length
    }

    render() {
        return (
            <View style = {styles.container}>
                <View>
                    <Text style = {styles.text}>Email:</Text>
                    <TextInput value = {this.email}
                               onChangeText = {this.handleEmailChange}
                               keyboarType = 'email-address'
                               style = {styles.input}
                    />
                </View>
                <View>
                    <Text style = {styles.text}>Password:</Text>
                    <TextInput value = {this.password}
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

    @action handleEmailChange = email => this.email = email
    @action handlePasswordChange = password => this.password = password

    handleSubmit = () => {
//        this.name
//        console.log('---', this.state)
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