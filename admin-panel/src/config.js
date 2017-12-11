import firebase from 'firebase'

export const appName = 'advreact-04-12-66c36'

const config = {
    apiKey: "AIzaSyDo7dedi23qFyb0vCT_KgYjhgzlf9itVxI",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "590592894041"
}

firebase.initializeApp(config)