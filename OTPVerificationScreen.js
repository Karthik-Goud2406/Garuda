// src/screens/OTPVerificationScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
import OTPInput from '../components/OTPInput';

export default function OTPVerificationScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { rideId } = route.params;
  const { user } = useContext(AuthContext);

  const [rideData, setRideData] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [expectedOtp, setExpectedOtp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const rideDocRef = doc(FIRESTORE_DB, 'rides', rideId);
        const rideSnap = await getDoc(rideDocRef);
        if (rideSnap.exists()) {
          const data = rideSnap.data();
          setRideData(data);
          setExpectedOtp(data.otp); // OTP should be generated & stored by driver acceptance logic
          setLoading(false);
        } else {
          Alert.alert('Ride not found');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Error fetching ride', error.message);
        navigation.goBack();
      }
    };
    fetchRide();
  }, [rideId]);

  const verifyOtpAndStartRide = async () => {
    if (otpInput.length !== 4) {
      Alert.alert('Enter a 4-digit OTP');
      return;
    }
    if (otpInput !== expectedOtp) {
      Alert.alert('Incorrect OTP, please try again');
      return;
    }

    try {
      // Update ride status to 'ongoing'
      const rideDocRef = doc(FIRESTORE_DB, 'rides', rideId);
      await updateDoc(rideDocRef, { status: 'ongoing', startedAt: new Date() });

      Alert.alert('OTP verified! Ride started.');
      navigation.navigate('LiveTrackingScreen', { rideId });
    } catch (error) {
      Alert.alert('Error starting ride', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading ride details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>Enter the 4-digit OTP given by your driver:</Text>
      <OTPInput value={otpInput} onChange={setOtpInput} />
      <TouchableOpacity style={styles.verifyButton} onPress={verifyOtpAndStartRide}>
        <Text style={styles.verifyButtonText}>Verify & Start Ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  instruction: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  verifyButton: {
    backgroundColor: '#f37254',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    alignItems: 'center',
  },
  verifyButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
