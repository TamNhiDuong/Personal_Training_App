import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'; 

const config = {
    apiKey: "AIzaSyAHVxdC1oqBzNePx46aB7vmYFNa5Z2qkqw",
    authDomain: "personal-trainer-auth.firebaseapp.com",
    databaseURL: "https://personal-trainer-auth.firebaseio.com",
    projectId: "personal-trainer-auth",
    storageBucket: "personal-trainer-auth.appspot.com",
    messagingSenderId: "634429726054",
    appId: "1:634429726054:web:2c1990bd7acce6f799bca7",
    measurementId: "G-L3R3J7KJC4"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth(); 
    this.db = app.database(); 
  }
  //Auth API
  doCreateUserWithEmailAndPassword = (email, password) =>
     this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
     this.auth.signInWithEmailAndPassword(email, password); 
  
  doSignOut = () => this.auth.signOut(); 

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => 
  this.auth.currentUser.updatePassword(password);
  //create user in Firebase DB
  
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;

