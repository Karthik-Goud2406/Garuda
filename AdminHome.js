import React from 'react';
import { View, Text } from 'react-native';

export default function AdminHome() {
  return (
    <View><Text>Welcome, Admin!</Text></View>
  );
}
import { auth } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';

const handleLogout = () => {
  signOut(auth);
};
