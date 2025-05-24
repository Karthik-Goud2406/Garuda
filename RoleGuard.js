import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Adjust path if needed
import { useNavigation } from '@react-navigation/native';

import RoleGuard from '../components/RoleGuard';

<><RoleGuard allowedRoles={['admin']}>
  <AdminDashboard />
</RoleGuard><RoleGuard allowedRoles={['rider']}>
    <RiderHome />
  </RoleGuard></>


const RoleGuard = ({ allowedRoles, children }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          // Not logged in, navigate to Login
          navigation.navigate('Login');
          return;
        }

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (allowedRoles.includes(userData.role)) {
            setLoading(false);
          } else {
            Alert.alert('Access Denied', 'You do not have permission to view this page.');
            navigation.goBack(); // Or navigate somewhere else
          }
        } else {
          Alert.alert('Error', 'User data not found!');
          navigation.navigate('Login');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        navigation.navigate('Login');
      }
    };

    checkRole();
  }, []);

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return children;
};

export default RoleGuard;
