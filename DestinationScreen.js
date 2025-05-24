// src/screens/DestinationScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { calculateFare } from '../utils/fareCalculator';
import { FIRESTORE_DB } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your key

export default function DestinationScreen() {
  const navigation = useNavigation();
  const { user, currentLocation } = useContext(AuthContext);

  const [destination, setDestination] = useState(null);
  const [fare, setFare] = useState(null);

  const onDestinationSelect = (data, details) => {
    if (!details) return;

    const destCoords = {
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng,
    };

    setDestination({
      description: data.description,
      coords: destCoords,
    });

    // Calculate fare based on distance (using currentLocation and destCoords)
    const dist = getDistanceFromLatLonInKm(
      currentLocation.latitude,
      currentLocation.longitude,
      destCoords.lat,
      destCoords.lng
    );
    const estimatedFare = calculateFare(dist);
    setFare(estimatedFare);
  };

  // Helper function to calculate distance between two lat/lng points
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const bookRide = async () => {
    if (!destination) {
      Alert.alert('Please select a destination');
      return;
    }

    try {
      const rideData = {
        userId: user.uid,
        pickupLocation: {
          description: 'Current Location',
          coords: currentLocation,
        },
        destination,
        fare,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      const ridesRef = collection(FIRESTORE_DB, 'rides');
      const rideDoc = await addDoc(ridesRef, rideData);

      // Navigate to RideRequestScreen with rideId
      navigation.navigate('RideRequestScreen', { rideId: rideDoc.id });
    } catch (error) {
      Alert.alert('Error booking ride', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Enter destination"
        onPress={onDestinationSelect}
        fetchDetails={true}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
        }}
        styles={{
          textInput: styles.input,
        }}
      />
      {fare !== null && (
        <View style={styles.fareContainer}>
          <Text style={styles.fareText}>Estimated Fare: ₹{fare.toFixed(2)}</Text>
          <TouchableOpacity style={styles.bookButton} onPress={bookRide}>
            <Text style={styles.bookButtonText}>Confirm & Book Ride</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  fareContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  fareText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bookButton: {
    backgroundColor: '#f37254',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
