import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // adjust path if needed

const usersCollection = collection(db, 'users');

export const createUser = async (uid, data) => {
  await setDoc(doc(usersCollection, uid), data);
};

export const getUser = async (uid) => {
  const userDoc = await getDoc(doc(usersCollection, uid));
  return userDoc.exists() ? userDoc.data() : null;
};
