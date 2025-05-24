// src/utils/NearbyDrivers.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GeoFirestore } from 'geofirestore';
updateDriverLocation('driver123', 17.385044, 78.486671); // Hyderabad coordinates

// Firebase configuration (replace with your config)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Initialize GeoFirestore
const geofirestore = new GeoFirestore(firestore);

// Reference to the 'drivers' collection
const geoCollection = geofirestore.collection('drivers');

/**
 * Find nearby drivers within a given radius from the rider's location.
 * @param {Object} riderLocation - Rider's location { lat: number, lng: number }
 * @param {number} radius - Radius in kilometers (default: 5 km)
 * @returns {Promise<Array>} - List of nearby drivers
 */
export async function findNearbyDrivers(riderLocation, radius = 5) {
  try {
    const { lat, lng } = riderLocation;

    // Create a GeoQuery for drivers within the radius
    const query = geoCollection.near({
      center: new geofirestore.GeoPoint(lat, lng),
      radius: radius // Radius in kilometers
    });

    // Execute the query and get the results
    const snapshot = await query.get();

    // Map the results to a list of drivers
    const nearbyDrivers = snapshot.docs.map(doc => ({
      id: doc.id,
      distance: doc.distance, // Distance in kilometers from rider
      ...doc.data()
    }));

    return nearbyDrivers;
  } catch (error) {
    console.error('Error finding nearby drivers:', error);
    throw error;
  }
}