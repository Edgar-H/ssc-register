import { doc, getDoc, updateDoc } from 'firebase/firestore';
import uniqid from 'uniqid';
import { dbProfiles } from '../settings';
import { firestore } from './firebaseConfig';

const uniqId = uniqid();

export const updateProfile = async (values, rfcProfile) => {
  const history_arrest = [
    {
      id: uniqId,
      reason_arrest: values.reason_arrest || null,
      description_arrest: values.description_arrest || null,
      date_arrest: values.date_arrest || null,
    },
  ];
  const date_arrest = values.date_arrest || null;
  const height = values.height;

  const docRef = doc(firestore, `${dbProfiles}/${rfcProfile}`);
  const docSnapshot = await getDoc(docRef);
  await updateDoc(docRef, {
    history_arrest: [...docSnapshot.data().history_arrest, ...history_arrest],
    date_arrest: date_arrest,
    height: height,
  });
  console.log('Profile updated');
};
