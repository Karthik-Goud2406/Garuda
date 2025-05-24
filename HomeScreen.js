import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { requestLocationPermission } from './LocationService';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const loc = await requestLocationPermission();
      if (loc) {
        setLocation(loc);
      }
    })();
  }, []);

  return (
    <View>
      {location ? (
        <Text>
          Location: {location.coords.latitude}, {location.coords.longitude}
        </Text>
      ) : (
        <Text>Requesting Location...</Text>
      )}
    </View>
  );
};

export default HomeScreen;
