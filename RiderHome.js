import React from 'react';
import { View, Text } from 'react-native';

export default function RiderHome() {
  return (
    <View><Text>Welcome, Rider!</Text></View>
  );
}
import { auth } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';

const handleLogout = () => {
  signOut(auth);
};

