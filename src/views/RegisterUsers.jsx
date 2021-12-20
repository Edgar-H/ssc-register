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
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

const RegisterUsers = () => {
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const [error, setError] = useState(),
    [success, setSuccess] = useState(),
    [nameUser, setNameUser] = useState(),
    [numberId, setNumberId] = useState(),
    [userList, setUserList] = useState(),
    [viewForm, setViewForm] = useState(false),
    [modeEdit, setModeEdit] = useState(false),
    [id, setId] = useState(),
    [dataUser, setDataUser] = useState();

  const getUsers = async () => {
    try {
      const userscollection = collection(firestore, 'users');
      const userList = await getDocs(userscollection);
      setUserList(userList.docs.map((doc) => doc.data()));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const view = () => {
    setError('');
    setSuccess('');
    viewForm ? setViewForm(false) : setViewForm(true);
  };

  const { register, handleSubmit } = useForm();

  const filterUser = (e) => {
    e.preventDefault();
    if (!nameUser || !numberId) {
      setError('Por favor ingresa datos para filtrar');
    }
    if (nameUser) {
    }
  };

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
    setSuccess('');

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
      if (userRegistration.operationType === 'signIn') {
        setDoc(docRef, {
          name,
          lastName,
          employeeNumber,
          email,
          role,
          userUid: `${userRegistration.user.uid}`,
          status: 'active',
        });
        setSuccess('Usuario registrado correctamente');
      }
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          return setError('El correo ya está en uso o fue utilizado');
        case 'auth/invalid-email':
          return setError('El correo no es válido');
        case 'auth/weak-password':
          return setError('La contraseña es muy débil');
        default:
          break;
      }
    }
    getUsers();
    setDataUser('');
    setError('');
  };

  const deleteUser = async (uid) => {
    try {
      const docRefDelete = await doc(firestore, `users/${uid}`);
      await deleteDoc(docRefDelete);
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async (dataUserUpdate) => {
    const { role, status } = dataUserUpdate;
    try {
      const docRefEdit = await doc(firestore, `users/${id}`);
      await updateDoc(docRefEdit, { status, role });
      setModeEdit(false);
      setDataUser('');
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const modeEditUser = async (userUid) => {
    setViewForm(false);
    setModeEdit(true);
    setId(userUid);
    userList.forEach((usr) => usr.userUid === userUid && setDataUser(usr));
  };

  const exitModeEditUser = () => {
    setModeEdit(false);
    setDataUser('');
  };

  return (
    <>
      <h3 className='txt-headers'>Administrador de usuarios</h3>
      <div className='register-users-container'>
        <div className='forms-admin-users'>
          <div className='form-control'>
            <label htmlFor='view'>
              <input type='checkbox' name='view' id='view' onChange={view} />
              <span>
                <i>Registrar</i>
              </span>
            </label>
          </div>
          {!viewForm ? (
            <>
              <form
                className='form-register-users'
                onSubmit={
                  modeEdit ? handleSubmit(editUser) : handleSubmit(onSubmit)
                }
              >
                <h2>
                  {modeEdit ? `Actualizar ${dataUser.name}` : 'Nuevo usuario'}
                </h2>
                <div className='message'>
                  {error && <p className='error-message'>{error}</p>}
                  {success && <p className='success-message'>{success}</p>}
                </div>
                {modeEdit ? (
                  <>
                    <label htmlFor='rol'>Rol del usuario</label>
                    <select id='role' {...register('role')}>
                      <option value='author'>Editor</option>
                      <option value='reader'>Lector</option>
                      <option value='admin'>Administrador</option>
                    </select>
                    <label htmlFor='status'>Rol del usuario</label>
                    <select id='status' {...register('status')}>
                      <option value='active'>Activo</option>
                      <option value='inactive'>Suspendido</option>
                      <option value='holidays'>Descansando</option>
                    </select>
                  </>
                ) : (
                  <>
                    <label htmlFor='rol'>Rol del usuario</label>
                    <select id='role' {...register('role')}>
                      <option value='author'>Editor</option>
                      <option value='reader'>Lector</option>
                      <option value='admin'>Administrador</option>
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
                    <label htmlFor='passwordConfirm'>
                      Confirmar contraseña
                    </label>
                    <input
                      type='password'
                      id='passwordConfirm'
                      placeholder='Confirmar contraseña'
                      {...register('passwordConfirm')}
                    />
                  </>
                )}

                {modeEdit ? (
                  <>
                    <button type='submit'>Actualizar</button>
                    <button onClick={exitModeEditUser} className='btn-cancel'>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button onClick={handleSubmit(onSubmit)}>Registrar</button>
                )}
              </form>
            </>
          ) : (
            <>
              <form className='form-filter-users'>
                <h2>Filtrar usuario</h2>
                <div className='message'>
                  {error && <p className='error-message'>{error}</p>}
                  {success && <p className='success-message'>{success}</p>}
                </div>
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
            </>
          )}
        </div>
        <div className='registered-users'>
          <h2>Usuarios registrados</h2>
          {userList?.map((_user) => (
            <div className='user-item' key={_user.employeeNumber}>
              <span>
                {_user.name} {_user.lastName}
              </span>
              <span>No: {_user.employeeNumber}</span>
              <span className={`status ${_user.status}`}>
                {_user.status === 'active' && 'Activo'}
                {_user.status === 'inactive' && 'Suspendido'}
                {_user.status === 'holidays' && 'Descansando'}
              </span>
              <span>
                Rol:
                {_user.role === 'author' && 'Editor'}
                {_user.role === 'reader' && 'Lector'}
                {_user.role === 'admin' && 'Administrador'}
              </span>
              <span>{_user.email}</span>
              <div className='btns-actions'>
                <i
                  className='fas fa-user-times'
                  onClick={() => deleteUser(_user.userUid)}
                ></i>
                <i
                  className='fas fa-user-edit'
                  onClick={() => modeEditUser(_user.userUid)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RegisterUsers;
