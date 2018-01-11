import {observable, action} from 'mobx'
import firebase from 'firebase'
import BasicStore from './BasicStore'

export default class AuthStore extends BasicStore {
    @observable user = null
    @observable email = ''
    @observable password = ''

    signIn = () => {
        firebase.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(this.setUser)
    }

    @action setUser = (user) => {
        this.user = user
        this.email = ''
        this.password = ''

        this.getStore('navigation').goTo('eventList')
    }
}