import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // adjust if needed

export const createUserProfile = async (uid, data) => {
  await setDoc(doc(db, 'users', uid), data);
};

export const getUserProfile = async (uid) => {
  const docSnap = await getDoc(doc(db, 'users', uid));
  return docSnap.exists() ? docSnap.data() : null;
};
await saveUser(uid, {
  name,
  phone,
  role,  // 'rider' | 'driver' | 'admin'
  createdAt: serverTimestamp()
});
