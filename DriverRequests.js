import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/firebaseConfig';
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from 'firebase/firestore';

const DriverRequests = () => {
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'rides'), where('status', '==', 'requested'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rides = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRideRequests(rides);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (rideId, newStatus) => {
    try {
      const rideRef = doc(db, 'rides', rideId);
      await updateDoc(rideRef, {
        status: newStatus,
        driverId: 'driver123', // Replace with actual logged-in driver ID
        updatedAt: new Date(),
      });
      console.log(`Ride ${rideId} updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating ride:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.rideCard}>
      <Text>Rider: {item.riderId}</Text>
      <Text>Destination: {item.destination?.name || 'Unknown'}</Text>
      <Text>Fare: ₹{item.estimatedFare}</Text>

      <View style={styles.buttons}>
        <Button title="Accept" onPress={() => handleUpdateStatus(item.id, 'accepted')} />
        <Button title="Reject" color="red" onPress={() => handleUpdateStatus(item.id, 'rejected')} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ride Requests</Text>
      <FlatList
        data={rideRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No ride requests right now</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  rideCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default DriverRequests;
