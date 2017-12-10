import firebase from "firebase";

export const appName = "adv-react-lykovrs";

const config = {
  apiKey: "AIzaSyBt2lilyVzkwxC5U0Jff1kGPgrR0stMww0",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: "",
  messagingSenderId: "347411917883",
};

firebase.initializeApp(config);
