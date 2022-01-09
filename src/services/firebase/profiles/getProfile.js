import { doc, getDoc } from 'firebase/firestore';
import { dbProfiles } from '../../settings';
import { firestore } from '../firebaseConfig';

export const getProfile = async (rfc) => {
  const docRef = doc(firestore, `${dbProfiles}/${rfc}`);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    console.log('No existe el documento');
    return null;
  }
};
