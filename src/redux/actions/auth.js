import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '../../services/firebase/firebaseConfig';
import { types } from '../types/types';
import {
  removeError,
  setError,
  setSuccess,
  removeSuccess,
  startLoading,
  finishLoading,
} from '../actions/ui';
import { getDataUser } from '../../services/firebase/getUser';

export const startLoginEmailPassword =
  (email, password) => async (dispatch) => {
    dispatch(startLoading());

    await signInWithEmailAndPassword(auth, email, password)
      .then((userFirebase) => {
        getDataUser(userFirebase.user.uid).then((userAuth) => {
          if (userAuth) {
            switch (userAuth.status) {
              case 'active':
                const loginData = {
                  uid: userAuth.uid,
                  email: userAuth.email,
                  employeeNumber: userAuth.employeeNumber,
                  lastName: userAuth.lastName,
                  name: userAuth.name,
                  role: userAuth.role,
                  status: userAuth.status,
                };
                dispatch(login(loginData));
                dispatch(removeError());
                dispatch(setSuccess('Acceso correcto, Bienvenido'));
                dispatch(finishLoading());
                break;
              case 'inactive':
                Swal.fire({
                  title: 'Usuario temporalmente suspendido',
                  icon: 'warning',
                });
                dispatch(finishLoading());
                break;
              case 'holidays':
                dispatch(setError('Usuario en vacaciones'));
                dispatch(finishLoading());
                break;
              default:
                break;
            }
          } else {
            dispatch(setError('Cuenta deshabilitada'));
            signOut(auth);
            dispatch(finishLoading());
          }
        });
      })
      .catch((err) => {
        setSuccess('');
        switch (err.code) {
          case 'auth/invalid-email':
            dispatch(finishLoading());
            dispatch(setError('Correo electrónico inválido'));
            break;
          case 'auth/user-not-found':
            dispatch(finishLoading());
            dispatch(setError('Usuario no encontrado'));
            break;
          case 'auth/wrong-password':
            dispatch(finishLoading());
            dispatch(setError('Contraseña incorrecta'));
            break;
          default:
            break;
        }
      });
    dispatch(removeSuccess());
  };

export const startLogout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout());
  dispatch(removeSuccess());
  dispatch(finishLoading());
};

export const login = (
  uid,
  email,
  employeeNumber,
  lastName,
  name,
  role,
  status
) => ({
  type: types.login,
  payload: {
    uid,
    email,
    employeeNumber,
    lastName,
    name,
    role,
    status,
    isLogged: true,
  },
});

export const logout = () => ({
  type: types.logout,
});
