import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { dbUsers } from '../../settings';
import { auth, firestore } from '../firebaseConfig';

export const createUser = async (userData) => {
  const { role, name, lastName, employeeNumber, email, password } = userData;

  try {
    const userRegistration = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userFirebase) => userFirebase);
    const docRef = await doc(
      firestore,
      `${dbUsers}/${userRegistration.user.uid}`
    );
    if (userRegistration.operationType === 'signIn') {
      console.log(userRegistration);
      setDoc(docRef, {
        name,
        lastName,
        employeeNumber,
        email,
        role,
        uid: `${userRegistration.user.uid}`,
        status: 'active',
      });
      return 'User created';
      /* await sendEmailVerification(
          auth,
          userRegistration.user.auth.currentUser
        )
          .then(() => console.log('Email enviado'))
          .catch((err) => console.log('Error al enviar el email', err)); */
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
