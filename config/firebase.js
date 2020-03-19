const firebase = require('firebase');
const auth = require('firebase/auth');

var firebaseConfig = {
    apiKey: "AIzaSyBSVxeXFahf_z2ehCCNV8GBgpB7MU-XlIY",
    authDomain: "todo-cli-54a06.firebaseapp.com",
    databaseURL: "https://todo-cli-54a06.firebaseio.com",
    projectId: "todo-cli-54a06",
    storageBucket: "todo-cli-54a06.appspot.com",
    messagingSenderId: "199220007587",
    appId: "1:199220007587:web:36517b5a8a92b89d31a516",
    measurementId: "G-6CFQHMLES2"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);
  firebase.auth();

module.exports = { 
    firebase,
    auth
}