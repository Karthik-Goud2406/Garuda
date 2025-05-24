useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Location permission is required for this app to work!');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  })();
}, []);
// Show nearby drivers on map using expo-maps and Firestore location updates
<MapView style={styles.map} region={region}>
  <Marker
    coordinate={userLocation}
    title="Your Location"
    pinColor="blue"
  />

  {destination && (
    <Marker
      coordinate={destination}
      title="Destination"
      pinColor="green"
    />
  )}
</MapView>
