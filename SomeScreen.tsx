// src/screens/SomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import RouteLoadingIndicator from '../components/Loading/RouteLoadingIndicator';

const SomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <RouteLoadingIndicator />;
  }

  return (
    <View>
      <Text>Route Content Loaded</Text>
    </View>
  );
};

export default SomeScreen;
