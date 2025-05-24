import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const driversCollection = collection(db, 'drivers');

export const createDriver = async (driverId, data) => {
  await setDoc(doc(driversCollection, driverId), data);
};

export const getDriver = async (driverId) => {
  const driverDoc = await getDoc(doc(driversCollection, driverId));
  return driverDoc.exists() ? driverDoc.data() : null;
};
