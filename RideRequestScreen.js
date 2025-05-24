import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { RideContext } from '../context/RideContext';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebase';
import { getDistance } from 'geolib';

export default function RideRequestScreen() {
  const { pickup, destination, setRideId, setRideStatus } = useContext(RideContext);
  const navigation = useNavigation();
  const [fare, setFare] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pickup && destination) {
      const dist = getDistance(pickup, destination) / 1000; // in km
      const estimatedFare = Math.max(30, Math.floor(dist * 10)); // ₹10 per km min ₹30
      setFare(estimatedFare);
    }
  }, [pickup, destination]);

  const handleBookRide = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, 'rides'), {
        pickup,
        destination,
        fare,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setRideId(docRef.id);
      setRideStatus('pending');
      setLoading(false);
      navigation.navigate('OTPVerification', { rideId: docRef.id });
    } catch (error) {
      console.error("Error booking ride:", error);
      setLoading(false);
    }
  };

  if (!pickup || !destination) {
    return <Text style={styles.centerText}>Location data missing</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pickup: {pickup?.address || `${pickup.latitude}, ${pickup.longitude}`}</Text>
      <Text style={styles.label}>Destination: {destination?.address || `${destination.latitude}, ${destination.longitude}`}</Text>
      <Text style={styles.fare}>Estimated Fare: ₹{fare}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button title="Confirm & Book Ride" onPress={handleBookRide} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  fare: { fontSize: 20, fontWeight: 'bold', marginVertical: 20 },
  centerText: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});



if (!currentUser) {
  navigation.navigate('Login');
  return;
}


<Button title="Confirm Ride" onPress={handleRideBooking} />

const handleRideBooking = async () => {
  const rideRef = await addDoc(collection(FIRESTORE_DB, 'rides'), {
    userId: currentUser.uid,
    pickup: userLocation,
    drop: destination,
    status: 'pending',
    timestamp: serverTimestamp()
  });
  navigation.navigate('OTPVerification', { rideId: rideRef.id });
};
