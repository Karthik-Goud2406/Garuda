import React, { useEffect, useState } from 'react';
import { getRide } from './rides'; // Adjust path if needed

export default function RideDetails({ rideId }) {
  const [ride, setRide] = useState(null);

  useEffect(() => {
    async function fetchRide() {
      try {
        const rideData = await getRide(rideId);
        setRide(rideData);
      } catch (error) {
        console.error('Failed to fetch ride:', error);
      }
    }
    if (rideId) {
      fetchRide();
    }
  }, [rideId]);

  if (!ride) return <div>Loading ride details...</div>;

  return (
    <div>
      <h2>Ride Details</h2>
      <p>Rider ID: {ride.riderId}</p>
      <p>Driver ID: {ride.driverId}</p>
      <p>Status: {ride.status}</p>
      {/* Add more ride info as needed */}
    </div>
  );
}
