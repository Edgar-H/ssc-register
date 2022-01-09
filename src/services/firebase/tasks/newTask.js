import { doc, getDoc, setDoc } from 'firebase/firestore';
import { dbTasks } from '../../settings';
import { firestore } from '../firebaseConfig';
import uniqid from 'uniqid';
import Swal from 'sweetalert2';

const uniqId = uniqid();

export const newTask = async (data, uid) => {
  console.log(data);
  const success = () => {
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const task = [
    {
      id: uniqId,
      title: data.title,
      description: data.description,
      date: data.date,
      hours: data.hours,
      priority: data.priority,
      status: false,
    },
  ];

  const taskRef = doc(firestore, `${dbTasks}/${uid}`);
  const consult = await getDoc(taskRef);
  if (consult.exists()) {
    const res = consult.data();
    await setDoc(taskRef, {
      tasks: [...res.tasks, ...task],
    });
    success();
  } else {
    await setDoc(taskRef, {
      tasks: task,
    });
    success();
  }
};
