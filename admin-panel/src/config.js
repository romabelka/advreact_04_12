import firebase from 'firebase'

export const appName = 'advreact-04-12'

const config = {
    apiKey: "AIzaSyCmDWlgYIhtEr1pWjgKYds3iXKWBl9wbjE",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "95255462276"
}

firebase.initializeApp(config)