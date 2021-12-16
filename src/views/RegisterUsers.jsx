import React, { useState } from 'react';
import cdmx from '../assets/cdmx.png';
import police from '../assets/logo-police.png';
import { useForm } from 'react-hook-form';
import app from '../services/firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const RegisterUsers = () => {
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const navigate = useNavigate();

  const [error, setError] = useState(),
    [success, setSuccess] = useState();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (loginData) => {
    const {
      role,
      name,
      lastName,
      employeeNumber,
      email,
      password,
      passwordConfirm,
    } = loginData;
    setError('');

    if (!role || !email || !password || !passwordConfirm) {
      return setError('Por favor llena todos los campos');
    }
    if (password !== passwordConfirm) {
      return setError('Las contraseñas no coinciden');
    }
    try {
      const userRegistration = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userFirebase) => userFirebase);

      const docRef = await doc(firestore, `users/${userRegistration.user.uid}`);
      setDoc(docRef, { name, lastName, employeeNumber, email, role });
      if (userRegistration.operationType === 'signIn') {
        setError('');
        setSuccess('Usuario registrado correctamente');
      }
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          return setError('El correo ya está en uso');
        case 'auth/invalid-email':
          return setError('El correo no es válido');
        case 'auth/weak-password':
          return setError('La contraseña es muy débil');
        default:
          break;
      }
    }
  };
  return (
    <div className='register-users-container'>
      <div className='regitser-users'>
        <div className='form-register-users'>
          <div className='logos'>
            <img src={cdmx} alt='' />
            <img src={police} alt='' />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            <label htmlFor='rol'>Rol del usuario</label>
            <select id='role' {...register('role')}>
              <option value='admin'>Administrador</option>
              <option value='user'>Usuario</option>
            </select>
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              id='name'
              placeholder='Nombre'
              {...register('name')}
            />
            <label htmlFor='lastName'>Apellido</label>
            <input
              type='text'
              id='lastName'
              placeholder='Apellido'
              {...register('lastName')}
            />
            <label htmlFor='employeeNumber'>Numero de empleado</label>
            <input
              type='text'
              id='employeeNumber'
              placeholder='123456789'
              {...register('employeeNumber')}
            />
            <label htmlFor='email'>Correo electrónico</label>
            <input
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
            <label htmlFor='passwordConfirm'>Confirmar contraseña</label>
            <input
              type='password'
              id='passwordConfirm'
              placeholder='Confirmar contraseña'
              {...register('passwordConfirm')}
            />
            <button onClick={handleSubmit(onSubmit)}>Registrar</button>
            <button onClick={navigate('/')}>Home</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUsers;
