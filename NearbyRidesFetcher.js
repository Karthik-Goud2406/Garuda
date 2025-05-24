import { GeoFirestore } from 'geofirestore';
import { getFirestore, GeoPoint } from 'firebase/firestore';
import * as Location from 'expo-location';

const firestore = getFirestore();
const geoFirestore = new GeoFirestore(firestore);

export const fetchNearbyRides = async (setRideRequests) => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({});
    const center = new GeoPoint(coords.latitude, coords.longitude);

    const query = geoFirestore.collection('rides')
      .near({ center, radius: 5 }) // radius in kilometers
      .where('status', '==', 'requested');

    const snapshot = await query.get();
    const nearbyRides = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setRideRequests(nearbyRides);
  } catch (error) {
    console.error('Error fetching nearby rides:', error);
  }
};
