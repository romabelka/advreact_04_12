import {observable, action, autorun} from 'mobx'
import firebase from 'firebase'
import BasicStore from './BasicStore'

export default class AuthStore extends BasicStore {
    @observable user = null
    @observable email = ""
    @observable password = ""
    @observable picture = ""
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

    @action
    setPicture = base64 => {
        this.picture = base64
    }

    uploadPhoto = async photo => {
        const base64 = "data:image/jpg;base64," + photo.base64
        this.setPicture(base64)
        const storageRef = firebase.storage().ref()
        const photoRef = storageRef.child(`photo/${this.user.uid}`)
        await photoRef.putString(photo.base64, "base64") // not working
    }
}
