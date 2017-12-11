import firebase from 'firebase'

export const appName = 'react-adv'

const config = {
    apiKey: "AIzaSyAs8-oh5yTEUxC5KQSOSZpaE8xReLZk0qQ",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "857981968367"
}

firebase.initializeApp(config)