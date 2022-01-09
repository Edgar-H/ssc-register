import { doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { dbTasks } from '../../settings';
import { firestore } from '../firebaseConfig';

export const deleteTask = async (listTasks, uid, task) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });
  const res = swalWithBootstrapButtons
    .fire({
      title: `Estas seguro de eliminar la tarea ${task.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const updateListTasks = listTasks.filter((item) => item.id !== task.id);
        const tasksRef = doc(firestore, `${dbTasks}/${uid}`);
        updateDoc(tasksRef, { tasks: [...updateListTasks] })
          .then(() => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Tarea eliminada correctamente',
              'success'
            );
            return updateListTasks;
          })
          .catch(() => {
            swalWithBootstrapButtons.fire(
              'Error!',
              'Error al eliminar tarea',
              'error'
            );
            return listTasks;
          });
        return updateListTasks;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tarea no eliminada',
          'error'
        );
        return listTasks;
      }
    });
  return res;
};
