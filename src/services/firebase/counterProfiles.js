import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { dbCounter } from '../settings';
import { firestore } from './firebaseConfig';

export const counterProfiles = async () => {
  const countRef = doc(firestore, `counter/${dbCounter}`);
  const docSnapshot = await getDoc(countRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data().count;
  }
  return 0;
};

export const addCounterProfiles = async () => {
  const counterRef = doc(firestore, `counter/${dbCounter}`);
  const counterDoc = await getDoc(counterRef);
  await updateDoc(counterRef, {
    count: counterDoc.data().count + 1,
  });
};
