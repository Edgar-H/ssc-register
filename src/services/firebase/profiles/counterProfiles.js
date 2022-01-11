import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { DB_COUNTER } from '../../settings';
import { firestore } from '../firebaseConfig';

export const counterProfiles = async () => {
  const countRef = doc(firestore, `counter/${DB_COUNTER}`);
  const docSnapshot = await getDoc(countRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data().count;
  }
  return 0;
};

export const addCounterProfiles = async () => {
  const counterRef = doc(firestore, `counter/${DB_COUNTER}`);
  const counterDoc = await getDoc(counterRef);
  await updateDoc(counterRef, {
    count: counterDoc.data().count + 1,
  });
};
