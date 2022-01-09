import { firestore } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { dbUsers } from '../settings';

export const getDataUser = async (uid) => {
  const docRef = doc(firestore, `${dbUsers}/${uid}`);
  const getUser = await getDoc(docRef);
  return getUser.data();
};
