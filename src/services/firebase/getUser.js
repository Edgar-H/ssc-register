import { firestore } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const getDataUser = async (uid) => {
  const docRef = doc(firestore, `users/${uid}`);
  const getUser = await getDoc(docRef);
  return getUser.data();
};
