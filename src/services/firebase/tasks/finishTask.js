import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { dbTasks } from '../../settings';
import { firestore } from '../firebaseConfig';

export const finishTask = async (listTasks, uid, task) => {
  const success = () => {
    Swal.fire({
      icon: 'success',
      title: 'Tarea finalizada',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const updateListTasks = listTasks.map((item) => {
    if (item.id === task.id) {
      return { ...item, finish: true };
    }
    return item;
  });
  console.log(updateListTasks);

  /* const tasksRef = doc(firestore, `${dbTasks}/${uid}`);
  setDoc(tasksRef, { tasks: [...updateListTasks] })
    .then(() => {
      success();
      return updateListTasks;
    })
    .catch(() => {
      return listTasks;
    }); */

  return updateListTasks;
};
