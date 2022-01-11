import { collection, getDocs } from 'firebase/firestore';
import { DB_USERS } from '../../settings';
import { firestore } from '../firebaseConfig';

export const getUsers = async () => {
  try {
    const userscollection = collection(firestore, DB_USERS);
    const userList = await getDocs(userscollection);
    return userList.docs.map((doc) => doc.data());
  } catch (err) {
    console.log(err);
    return err;
  }
};
