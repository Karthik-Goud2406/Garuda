
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const RouteLoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // or 'transparent' depending on context
  },
});

export default RouteLoadingIndicator;
