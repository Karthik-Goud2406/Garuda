import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const ridesCollection = collection(db, 'rides');

export const createRide = async (rideId, data) => {
  await setDoc(doc(ridesCollection, rideId), data);
};

export const getRide = async (rideId) => {
  const rideDoc = await getDoc(doc(ridesCollection, rideId));
  return rideDoc.exists() ? rideDoc.data() : null;
};
