// src/screens/SignupScreen.js
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig'; // your Firestore instance
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { createUser } from './users'; 
const [role, setRole] = useState('rider'); // or 'driver', 'admin'


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rider'); // or 'driver', 'admin'

  const handleSignUp = async () => {
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 2. Save user info & role in Firestore
      await createUser(uid, { email, role });

      alert('User created successfully!');
      // Navigate to login or home screen here
    } catch (error) {
      console.error('Error signing up:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      {/* Your input fields for email, password, role */}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="rider">Rider</option>
        <option value="driver">Driver</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}


const registerUser = async (email, password, role = "rider") => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  await setDoc(doc(db, "users", uid), {
    email,
    role, // 'rider', 'driver', or 'admin'
    createdAt: new Date()
  });
};

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rider');

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        role,
        uid: userCred.user.uid,
      });
      navigation.replace(role === 'rider' ? 'RiderHome' : 'DriverHome');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} style={styles.input} />
      <Button title="Sign Up as Rider" onPress={() => { setRole('rider'); handleSignup(); }} />
      <Button title="Sign Up as Driver" onPress={() => { setRole('driver'); handleSignup(); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5
  }
});
