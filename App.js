


import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RiderHome from './screens/RiderHome';
import DriverHome from './screens/DriverHome';
import AdminHome from './screens/AdminHome';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/utils/firebase';

import { getUserRole } from './utils/getUserRole';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRole(user.uid);
        setUserRole(role);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // optional loading screen

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userRole && <Stack.Screen name="Login" component={LoginScreen} />}
        {userRole === 'rider' && (
          <Stack.Screen name="RiderHome" component={RiderHome} />
        )}
        {userRole === 'driver' && (
          <Stack.Screen name="DriverHome" component={DriverHome} />
        )}
        {userRole === 'admin' && (
          <Stack.Screen name="AdminHome" component={AdminHome} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
