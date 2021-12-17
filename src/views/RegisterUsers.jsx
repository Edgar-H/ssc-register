import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import app from '../services/firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

const RegisterUsers = () => {
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const [error, setError] = useState(),
    [success, setSuccess] = useState(),
    [nameUser, setNameUser] = useState(),
    [numberId, setNumberId] = useState(),
    [userList, setUserList] = useState();

  const { register, handleSubmit } = useForm();

  const filterUser = (e) => {
    e.preventDefault();
    if (!nameUser && !numberId) {
      setError('Por favor ingresa datos para filtrar');
    }
    if (nameUser) {
    }
  };

  const getUsers = async () => {
    try {
      const userscollection = collection(firestore, 'users');
      const userList = await getDocs(userscollection);
      // setUserList(userList.docs.map((doc) => ({ ...doc.data() })));
      setUserList(userList.docs.map((doc) => doc.data()));
      // console.log(userList);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

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
      getUsers();
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
    <>
      <h3 className='txt-headers'>Administrador de usuarios</h3>
      <div className='register-users-container'>
        <div className='forms-admin-users'>
          <form className='form-filter-users'>
            <h2>Filtrar usuario</h2>
            <label htmlFor='name-user'>Nombre</label>
            <input
              type='text'
              id='name-user'
              name='name'
              placeholder='Nombre'
              onChange={(e) => setNameUser(e.target.value)}
            />
            <label htmlFor='number-id'>Numero de empleado</label>
            <input
              type='number'
              id='number-id'
              name='number-id'
              placeholder='Numero de empleado'
              onChange={(e) => setNumberId(e.target.value)}
            />
            <button onClick={(e) => filterUser(e)}>Filtrar</button>
          </form>
          <div></div>
          <form
            className='form-register-users'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2>Nuevo usuario</h2>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            <label htmlFor='rol'>Rol del usuario</label>
            <select id='role' {...register('role')}>
              <option value='admin'>Administrador</option>
              <option value='author'>Editor</option>
              <option value='reader'>Lector</option>
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
            <label htmlFor='passwordConfirm'>Confirmar contraseña</label>
            <input
              type='password'
              id='passwordConfirm'
              placeholder='Confirmar contraseña'
              {...register('passwordConfirm')}
            />
            <button onClick={handleSubmit(onSubmit)}>Registrar</button>
          </form>
        </div>
        <div className='registered-users'>
          <h2>Usuarios registrados</h2>
          {userList?.map((i) => (
            <div className='user-item' key={i.employeeNumber}>
              <div className='user-data'>
                <p>{i.name}</p>
                <p>No: {i.employeeNumber}</p>
                <p className='status holidays'>Activo</p>
                <p>Rol: {i.role}</p>
                <p>{i.email}</p>
              </div>
              <div className='btns-actions'>
                <i className='fas fa-user-times'></i>
                <i className='fas fa-user-edit'></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RegisterUsers;
