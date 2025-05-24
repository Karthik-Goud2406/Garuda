

import { useEffect } from 'react';
import { registerForPushNotificationsAsync } from './src/utils/pushNotifications';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <NavigationContainer>
      {/* Stack.Navigator here */}
    </NavigationContainer>
  );
}




import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RiderScreenWrapper from './RiderScreenWrapper'; // Import the wrapper
import MultiRoleWrapper from './MultiRoleWrapper';
import ProfileScreen from './src/screens/ProfileScreen';
import SupportScreen from './src/screens/SupportScreen';



navigation.navigate('Profile');
navigation.navigate('Support');



<Stack.Screen
  name="DriverOrAdminHome"
  component={MultiRoleWrapper}
  options={{ headerShown: false }}
/>

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Other screens like Login, Signup, etc. */}
      
      <Stack.Screen
        name="RiderHome"
        component={RiderScreenWrapper}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
