import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { firestore } from '../utils/firebaseUtils';

export default function RateDriverScreen({ route, navigation }) {
  const [rating, setRating] = useState(0);
  const { rideId, driverId } = route.params;

  const submitRating = () => {
    firestore.collection('drivers').doc(driverId).collection('ratings').add({
      rating,
      rideId,
      createdAt: new Date(),
    }).then(() => {
      navigation.navigate('HomeScreen');
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Rate your driver</Text>
      <Button title="1 Star" onPress={() => setRating(1)} />
      <Button title="2 Stars" onPress={() => setRating(2)} />
      <Button title="3 Stars" onPress={() => setRating(3)} />
      <Button title="4 Stars" onPress={() => setRating(4)} />
      <Button title="5 Stars" onPress={() => setRating(5)} />
      <Button title="Submit Rating" onPress={submitRating} disabled={rating === 0} />
    </View>
  );
}
