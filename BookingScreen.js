import React from 'react';
import { Button, Text, View } from 'react-native';
import { bookRide } from '../../services/rideService';

const BookingScreen = ({ route }) => {
  const { destination, estimatedFare, estimatedTime, distance } = route.params;

  const handleBookRide = async () => {
    const rideData = {
      riderId: 'rider123', // get from auth
      destination,
      estimatedFare,
      estimatedTime,
      distance,
      status: 'pending',
      createdAt: new Date(),
    };

    await bookRide(rideData);
  };

  return (
    <View>
      <Text>Destination: {destination.name}</Text>
      <Text>Fare: ₹{estimatedFare}</Text>
      <Button title="Book Ride" onPress={handleBookRide} />
    </View>
  );
};

export default BookingScreen;
