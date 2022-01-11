import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getUsers } from '../services/firebase/users/getUsers';
import { createUser } from '../services/firebase/users/createUser';
import { updatedUser } from '../services/firebase/users/updateUser';
import { deleteUser } from '../services/firebase/users/deletUser';

const RegisterUsers = () => {
  const [error, setError] = useState(''),
    [success, setSuccess] = useState(''),
    [userList, setUserList] = useState(),
    [modeEdit, setModeEdit] = useState(false),
    [id, setId] = useState(''),
    [dataUser, setDataUser] = useState('');

  useEffect(() => {
    getUsers().then((users) => {
      setUserList(users);
    });
  }, []);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (loginData) => {
    const {
      role,
      name,
      last_name,
      employee_number,
      email,
      password,
      password_confirm,
    } = loginData;
    setError('');
    setSuccess('');

    if (
      !role ||
      !email ||
      !password ||
      !password_confirm ||
      !name ||
      !last_name ||
      !employee_number
    ) {
      return setError('Por favor llena todos los campos');
    }
    if (password !== password_confirm) {
      return setError('Las contraseñas no coinciden');
    }
    createUser(loginData, id)
      .then((user) => {
        if (user) {
          setSuccess('Usuario creado');
          setUserList(getUsers());
          setTimeout(() => {
            setSuccess('');
          }, 3000);
        }
      })
      .catch((err) => {
        setError(err);
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  };

  const editUser = async (dataUserUpdate) => {
    updatedUser(dataUserUpdate)
      .then((res) => {
        setSuccess(res);
        setTimeout(() => {
          setSuccess('');
        }, 3000);
        setModeEdit(false);
        setDataUser('');
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const modeEditUser = async (userUid) => {
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
                  {...register('last_name')}
                />
                <label htmlFor='employeeNumber'>Numero de empleado</label>
                <input
                  type='text'
                  id='employeeNumber'
                  placeholder='123456789'
                  {...register('employee_number')}
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
                  {...register('password_confirm')}
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
        </div>
        <div className='registered-users'>
          <h2>Usuarios registrados</h2>
          {userList?.map((_user) => (
            <div className='user-item' key={_user.employee_number}>
              <span>
                {_user.name} {_user.last_name}
              </span>
              <span>No: {_user.employee_number}</span>
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
                  onClick={() => deleteUser(_user)}
                ></i>
                <i
                  className='fas fa-user-edit'
                  onClick={() => modeEditUser(_user.uid)}
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
