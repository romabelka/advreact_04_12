import firebase from 'firebase'

export const appName = 'advreact-04-12-vesna'

const config = {
    appName: appName,
    apiKey: "AIzaSyAkBB770P-MOKox9k6DjFRKi9J-bIoMnJs",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "786443944884"
}

firebase.initializeApp(config)