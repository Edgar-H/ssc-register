import React, { useState } from 'react';
import useAuth from '../auth/useAuth';
import cdmx from '../assets/cdmx.png';
import police from '../assets/logo-police.png';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import app from '../services/firebase/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const user = useAuth();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const [error, setError] = useState(),
    [success, setSuccess] = useState();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (loginData) => {
    const { email, password } = loginData;
    setError('');

    if (!email || !password) {
      return setError('Por favor ingresa correo y contraseña');
    }

    const getDataUser = async (uid) => {
      const docRef = doc(firestore, `users/${uid}`);
      const getUser = await getDoc(docRef);
      const dataUser = getUser.data();
      return dataUser;
    };

    try {
      const userLogin = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userFirebase) => {
        return userFirebase;
      });
      getDataUser(userLogin.user.uid).then((userAuth) => {
        const loginData = {
          name: userAuth.name,
          employeeNumber: userAuth.employeeNumber,
          email: userAuth.email,
          role: userAuth.role,
        };
        user.login(loginData);
      });

      setError('');
      setSuccess('Acceso correcto');
    } catch (err) {
      setSuccess('');
      switch (err.code) {
        case 'auth/invalid-email':
          return setError('El correo no es válido');
        case 'auth/user-not-found':
          return setError('El usuario no existe');
        case 'auth/wrong-password':
          return setError('La contraseña es incorrecta');
        default:
          break;
      }
    }
  };
  return user.userAuth ? (
    <Navigate to='/' />
  ) : (
    <div className='login-container'>
      <div className='login'>
        <div className='form-login'>
          <div className='logos'>
            <img src={cdmx} alt='' />
            <img src={police} alt='' />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='message'>
              {error && <p className='error-message message'>{error}</p>}
              {success && <p className='success-message message'>{success}</p>}
            </div>
            <label htmlFor='email'>Correo electrónico</label>
            <input
              style={{ textTransform: 'lowercase' }}
              type='email'
              id='email'
              placeholder='example@example.com'
              {...register('email')}
            />
            <label htmlFor='password'>Contraseña</label>
            <input
              type='password'
              id='password'
              placeholder='Contraseña'
              {...register('password')}
            />
            <button onClick={handleSubmit(onSubmit)}>Ingresar</button>
          </form>
        </div>
        <div className='unsplash'>
          <img
            src='https://images.unsplash.com/flagged/photo-1560177776-55a762c5c000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
