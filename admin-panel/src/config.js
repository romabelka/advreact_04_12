import firebase from 'firebase'

export const appName = 'advreact-386f6'

const config = {
    apiKey: "AIzaSyDSPRtistNZnrnNMJXCra5uS9Ugpken3F0",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "648901552269"
}

firebase.initializeApp(config)