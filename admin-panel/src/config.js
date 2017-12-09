import firebase from 'firebase'

export const appName = 'advreact0412'

const config = {
    apiKey: "AIzaSyCFY57-ViC6JCloWtC_2w5cIUIGcPiwhG0",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: "advreact0412",
    storageBucket: "",
    messagingSenderId: "513427030560"
}

firebase.initializeApp(config)