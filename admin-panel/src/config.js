import firebase from 'firebase';

export const appName = 'adv-react-8c4fb';

const config = {
    apiKey: "AIzaSyCPlodrXJgpCXqDWklsFc_V5vHGiD6G2Uc",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: {appName},
    storageBucket: "adv-react-8c4fb.appspot.com",
    messagingSenderId: "47356959167"
};

firebase.initializeApp(config);