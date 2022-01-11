import { deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { DB_USERS } from '../../settings';
import { firestore } from '../firebaseConfig';

export const deleteUser = async (user) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: `Estas seguro de eliminar a ${user.name} ${user.lastName}`,
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await doc(firestore, `${DB_USERS}/${user.uid}`)
          .then((ref) => deleteDoc(ref))
          .then(() => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Usuario eliminado correctamente',
              'success'
            );
          })
          .catch(() => {
            swalWithBootstrapButtons.fire(
              'Error!',
              'Error al eliminar usuario',
              'error'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Usuario no eliminado',
          'error'
        );
      }
    });
};
