import { signOut } from 'firebase/auth';
import { login } from '../redux/actions/auth';
import { auth } from '../services/firebase/firebaseConfig';
import { getDataUser } from '../services/firebase/users/getUser';

export const authState = () => {
  auth.onAuthStateChanged((user) => {
    if (user?.uid) {
      getDataUser(user.uid).then((userAuth) => {
        if (userAuth.status === 'active') {
          const loginData = {
            uid: userAuth.uid,
            email: userAuth.email,
            employeeNumber: userAuth.employeeNumber,
            lastName: userAuth.lastName,
            name: userAuth.name,
            role: userAuth.role,
            status: userAuth.status,
          };
          return loginData;
        } else {
          signOut(auth);
        }
      });
    }
  });
};
