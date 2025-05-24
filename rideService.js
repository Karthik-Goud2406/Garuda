import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const bookRide = async (rideData) => {
  try {
    const rideRef = await addDoc(collection(db, 'rides'), rideData);
    console.log('Ride booked with ID: ', rideRef.id);
  } catch (error) {
    console.error('Error booking ride:', error);
  }
};
