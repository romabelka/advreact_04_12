import firebase from 'firebase'

export const appName = 'advreact-dimonnwc3'

const config = {
    apiKey: "AIzaSyDffkkI6OOWuk6UEgTefwy1PllYHB8-OWQ",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "78222543153"
}

firebase.initializeApp(config)
