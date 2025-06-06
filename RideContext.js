import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../utils/firebaseUtils';

export const RideContext = createContext();

export function RideProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState(null); // Get from location services or AuthContext
  const [destination, setDestination] = useState(null);
  const [ride, setRide] = useState(null);
  const [driver, setDriver] = useState(null);

  // Book ride function
  async function bookRide(destinationLoc, fare) {
    if (!currentLocation) return;

    const rideDoc = {
      userId: 'CURRENT_USER_ID', // replace with real user ID from auth
      pickupLocation: currentLocation,
      destination: destinationLoc,
      fare,
      status: 'requested',
      createdAt: new Date(),
    };

    const docRef = await firestore.collection('rides').add(rideDoc);
    setRide({ id: docRef.id, ...rideDoc });

    // Listen for ride status updates (driver assignment)
    firestore.collection('rides').doc(docRef.id)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        if (!data) return;

        setRide({ id: docRef.id, ...data });

        if (data.status === 'accepted' && data.driverId) {
          // Fetch driver info
          firestore.collection('drivers').doc(data.driverId).get()
            .then(doc => setDriver({ id: doc.id, ...doc.data() }));
        }
      });
  }

  // OTP verification and other ride status updates will be handled in other screens.

  return (
    <RideContext.Provider value={{
      currentLocation,
      setCurrentLocation,
      destination,
      setDestination,
      ride,
      setRide,
      driver,
      setDriver,
      bookRide,
    }}>
      {children}
    </RideContext.Provider>
  );
}
