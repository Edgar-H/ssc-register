import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { dbProfiles } from '../../assets/settings';
import { firestore } from './firebaseConfig';

export const setProfile = async (values, rfc, imgProfile) => {
  const profile = {
    img_profile: imgProfile,
    full_name: `${values.name} ${values.first_last_name} ${values.second_last_name}`,
    name: values.name,
    first_last_name: values.first_last_name || null,
    second_last_name: values.second_last_name || null,
    alias: values.alias || null,
    date_birth: values.date_birth || null,
    height: values.height || null,
    gender: values.gender || null,
    tattoos: values.tattoos || null,
    nationality: values.nationality || null,
    country_birth: values.country_birth || null,
    place_birth: values.place_birth || null,
    rfc: rfc,
    history_arrest: [
      {
        reason_arrest: values.reason_arrest || null,
        description_arrest: values.description_arrest || null,
        date_arrest: values.date_arrest || null,
      },
    ],
    timestamp: serverTimestamp(),
  };

  const profilesRef = query(
    collection(firestore, dbProfiles),
    where('rfc', '==', rfc)
  );
  const querySnapshots = await getDocs(profilesRef);
  const [profileDuplicate] = querySnapshots.docs.map((doc) => doc.id);
  if (profileDuplicate === rfc) {
    console.log(profileDuplicate);
    console.log('Ya existe un registro con ese rfc');
    // activeModal('duplicate');
  } else {
    console.log('sin coincidencias');
    await setDoc(doc(firestore, dbProfiles, `${rfc}`), profile);
    console.log('Perfil guardado');
  }
};
