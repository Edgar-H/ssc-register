import { doc, getDoc } from 'firebase/firestore';
import { DB_PROFILES } from '../../settings';
import { firestore } from '../firebaseConfig';

export const getProfile = async (rfc) => {
  const docRef = doc(firestore, `${DB_PROFILES}/${rfc}`);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    console.log('No existe el documento');
    return null;
  }
};
