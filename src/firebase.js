import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAaJERB-FbcS4mO7IkU8u6-ULJTbjdd9tQ",
    authDomain: "second-clone-847fb.firebaseapp.com",
    projectId: "second-clone-847fb",
    storageBucket: "second-clone-847fb.appspot.com",
    messagingSenderId: "487303284040",
    appId: "1:487303284040:web:704055ee8ce3297e03df7d",
    measurementId: "G-32L77J5XXF"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db,auth}
