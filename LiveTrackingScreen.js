import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RideContext } from '../context/RideContext';
import { firestore } from '../utils/firebaseUtils';

export default function LiveTrackingScreen() {
  const { ride, driver } = useContext(RideContext);
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    if (!ride || !ride.id) return;

    // Listen to driver's location updates in Firestore
    const unsubscribe = firestore.collection('drivers').doc(ride.driverId)
      .onSnapshot(doc => {
        const data = doc.data();
        if (data && data.location) {
          setDriverLocation(data.location);
        }
      });

    return () => unsubscribe();
  }, [ride]);

  if (!driverLocation) return <Text>Waiting for driver location...</Text>;

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={driverLocation} title="Driver Location" />
    </MapView>
  );
}
