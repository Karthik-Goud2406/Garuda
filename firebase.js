// src/config/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';

import { auth } from './firebaseConfig';
import { signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();  // Use the default app if already initialized
}

export default firebase;
// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};



export { auth };
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Get the credential from the Google provider
const credential = await GoogleAuthProvider.credential(idToken, accessToken); // Use the tokens from Google sign-in.

// Sign in with the credential
try {
  const userCredential = await signInWithCredential(auth, credential);
  console.log('User signed in: ', userCredential);
} catch (error) {
  console.error('Error signing in: ', error);
}

