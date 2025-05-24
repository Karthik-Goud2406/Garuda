import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface RideDetails {
  pickupLocation: string;
  dropoffLocation: string;
  driverName: string;
  vehicle: string;
  estimatedFare: number;
}

const ConfirmRideScreen: React.FC = () => {
  // Example ride details (replace with actual data from props, state, or API)
  const rideDetails: RideDetails = {
    pickupLocation: '123 Main St, City',
    dropoffLocation: '456 Elm St, City',
    driverName: 'John Doe',
    vehicle: 'Toyota Camry',
    estimatedFare: 15.99,
  };

  const handleConfirmRide = () => {
    // Logic to confirm the ride (e.g., API call, navigation)
    console.log('Ride confirmed!');
  };

  const handleCancel = () => {
    // Logic to cancel or go back
    console.log('Ride cancelled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Ride</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Pickup:</Text>
        <Text style={styles.value}>{rideDetails.pickupLocation}</Text>
        
        <Text style={styles.label}>Drop-off:</Text>
        <Text style={styles.value}>{rideDetails.dropoffLocation}</Text>
        
        <Text style={styles.label}>Driver:</Text>
        <Text style={styles.value}>{rideDetails.driverName}</Text>
        
        <Text style={styles.label}>Vehicle:</Text>
        <Text style={styles.value}>{rideDetails.vehicle}</Text>
        
        <Text style={styles.label}>Estimated Fare:</Text>
        <Text style={styles.value}>${rideDetails.estimatedFare.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Confirm Ride" onPress={handleConfirmRide} />
        <Button title="Cancel" onPress={handleCancel} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  
