import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const locationsCollection = collection(db, 'locations');

export const setLocation = async (locationId, data) => {
  await setDoc(doc(locationsCollection, locationId), data);
};

export const getLocation = async (locationId) => {
  const locationDoc = await getDoc(doc(locationsCollection, locationId));
  return locationDoc.exists() ? locationDoc.data() : null;
};
