import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAPrkwjwbxG_fFRoexNWjGfSAJ-mxBqohg",
    authDomain: "my-react-web-spas.firebaseapp.com",
    databaseURL: "https://my-react-web-spas.firebaseio.com",
    projectId: "my-react-web-spas",
    storageBucket: "my-react-web-spas.appspot.com",
    messagingSenderId: "485533160228",
    appId: "1:485533160228:web:7190ea93cb6deb09e9d9b1",
    measurementId: "G-SV8F546GKM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  
  export default firebase;