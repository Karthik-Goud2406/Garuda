import React from 'react';
import { View, Text } from 'react-native';

export default function DriverHome() {
  return (
    <View><Text>Welcome, Driver!</Text></View>
  );
}
import { auth } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';

const handleLogout = () => {
  signOut(auth);
};
