

import { getDirections } from '../utils/MapDirections';

const origin = { lat: 17.385044, lng: 78.486671 };   // Hyderabad example
const destination = { lat: 17.4474, lng: 78.3762 };

getDirections(origin, destination)
  .then(({ distanceText, durationText, points }) => {
    console.log('Distance:', distanceText);
    console.log('Duration:', durationText);
    // Use points to draw polyline on map
  })
  .catch(console.error);


// src/utils/MapDirections.js
const GOOGLE_MAPS_API_KEY = 'AIzaSyD4fghk12345abcdefg';  // Replace with your real API key

/**
 * Fetch directions between origin and destination coordinates.
 * @param {{lat:number, lng:number}} origin 
 * @param {{lat:number, lng:number}} destination 
 * @returns {Promise<{distanceText: string, durationText: string, points: string}>}
 */
export async function getDirections(origin, destination) {
  const originStr = `${origin.lat},${origin.lng}`;
  const destinationStr = `${destination.lat},${destination.lng}`;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Directions API error: ${data.status}`);
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    return {
      distanceText: leg.distance.text,
      durationText: leg.duration.text,
      points: route.overview_polyline.points, // for drawing on map
    };
  } catch (error) {
    console.error('Failed to fetch directions:', error);
    throw error;
  }
}
