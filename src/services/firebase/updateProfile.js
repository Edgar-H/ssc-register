import { doc, getDoc, updateDoc } from 'firebase/firestore';
import uniqid from 'uniqid';
import { dbProfiles } from '../../assets/settings';
import { firestore } from './firebaseConfig';

const uniqId = uniqid();

export const updateProfile = async (values, rfc) => {
  const history_arrest = [
    {
      id: uniqId,
      reason_arrest: values.reason_arrest || null,
      description_arrest: values.description_arrest || null,
      date_arrest: values.date_arrest || null,
    },
  ];

  const docRef = doc(firestore, `${dbProfiles}/${rfc}`);
  const docSnapshot = await getDoc(docRef);
  await updateDoc(docRef, {
    history_arrest: [...docSnapshot.data().history_arrest, ...history_arrest],
  });
  console.log('Profile updated');
};
