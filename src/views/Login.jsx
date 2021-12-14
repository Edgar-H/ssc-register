import React, { useState } from 'react';
import useAuth from '../auth/useAuth';
import cdmx from '../assets/cdmx.png';
import police from '../assets/logo-police.png';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
  const auth = useAuth();

  const [error, setError] = useState(),
    [success, setSuccess] = useState();

  const { register, handleSubmit } = useForm();
  const onSubmit = (loginData) => {
    const { userName, password } = loginData;
    setError('');

    if (!userName || !password) {
      return setError('Por favor ingresa usuario y contraseña');
    }

    try {
      auth.login(loginData);
      setError('');
      setSuccess('Acceso correcto');
    } catch (err) {
      console.log(err);
    }
  };

  return auth.userAuth ? (
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
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            <label htmlFor='username'>Nombre de usuario</label>
            <input
              type='text'
              id='username'
              placeholder='username'
              {...register('userName')}
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
