import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyCae4w9_fVvNFdimNhSI1bHZ0YmajraYg8",
    authDomain: "reactcrud-fb29f.firebaseapp.com",
    projectId: "reactcrud-fb29f",
    storageBucket: "reactcrud-fb29f.appspot.com",
    messagingSenderId: "503650812804",
    appId: "1:503650812804:web:dd419a52fa093cf76b53d1",
    measurementId: "G-ZHR311DPVX"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database(); 

export { firebase, auth, database } 
