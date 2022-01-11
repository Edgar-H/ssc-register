import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { DB_USERS } from '../../settings';
import { auth, firestore } from '../firebaseConfig';

export const createUser = async (userData) => {
  const { role, name, last_name, employee_number, email, password } = userData;

  try {
    const userRegistration = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userFirebase) => userFirebase);
    const docRef = await doc(
      firestore,
      `${DB_USERS}/${userRegistration.user.uid}`
    );
    if (userRegistration.operationType === 'signIn') {
      console.log(userRegistration);
      setDoc(docRef, {
        name,
        last_name,
        employee_number,
        email,
        role,
        uid: `${userRegistration.user.uid}`,
        status: 'active',
      });
      return 'User created';
    }
  } catch (err) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        console.log('El correo ya está en uso o fue utilizado');
        return 'El correo ya está en uso o fue utilizado';
      case 'auth/invalid-email':
        console.log('El correo no es válido');
        return 'El correo no es válido';
      case 'auth/weak-password':
        console.log('La contraseña es muy débil');
        return 'La contraseña es muy débil';
      default:
        break;
    }
  }
};
