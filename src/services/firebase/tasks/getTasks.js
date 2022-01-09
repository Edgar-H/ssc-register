import { doc, getDoc } from 'firebase/firestore';
import { dbTasks } from '../../settings';
import { firestore } from '../firebaseConfig';

export const getTasks = async (uid) => {
  const tasksRef = await doc(firestore, `${dbTasks}/${uid}`);
  const consult = await getDoc(tasksRef);
  if (consult.exists()) {
    const res = consult.data();
    return res.tasks;
  }
};
