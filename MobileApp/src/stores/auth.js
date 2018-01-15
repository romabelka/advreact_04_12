import {observable, action, autorun} from 'mobx'
import firebase from 'firebase'
import BasicStore from './BasicStore'

export default class AuthStore extends BasicStore {
    @observable user = null
    @observable email = ''
    @observable password = ''
    constructor(...args) {
        super(...args)

        firebase.auth().onAuthStateChanged(this.setUser)

        let initRedirect = false

        autorun(() => {
            const routeName = this.user ? 'lists' : 'auth'
            if (initRedirect) {
                this.getStore('navigation').reset(routeName)
            }
            initRedirect = true
        })
    }


    signIn = () => {
        firebase.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(this.setUser)
    }

    @action setUser = (user) => {
        this.user = user
        this.email = ''
        this.password = ''
    }
}