import { firestore } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { DB_USERS } from '../../settings';

export const getUserAuth = async (uid) => {
  const docRef = doc(firestore, `${DB_USERS}/${uid}`);
  const getUser = await getDoc(docRef);
  return getUser.data();
};
