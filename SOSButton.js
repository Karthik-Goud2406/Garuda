import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function SOSButton() {
  const handleSOS = () => {
    Alert.alert('SOS', 'Emergency SOS activated! Sending location to contacts.');
    // Implement location sharing + alert logic here (send to contacts, server, etc)
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSOS}>
      <Text style={styles.text}>SOS</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
