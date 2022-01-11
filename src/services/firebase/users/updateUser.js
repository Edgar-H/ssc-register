import { doc, updateDoc } from 'firebase/firestore';
import { DB_USERS } from '../../settings';
import { firestore } from '../firebaseConfig';

export const updatedUser = async (dataUserUpdate, id) => {
  const { role, status } = dataUserUpdate;
  try {
    await doc(firestore, `${DB_USERS}/${id}`).then((doc) =>
      updateDoc(doc, { status, role })
    );
    return 'Usuario actualizado';
  } catch (err) {
    console.log(err);
    return 'Usuario no actualizado';
  }
};
