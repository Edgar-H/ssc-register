import React from 'react';
import cdmx from '../assets/cdmx.png';
import police from '../assets/logo-police.png';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { startLoginEmailPassword } from '../redux/actions/auth';
import { setError, removeError } from '../redux/actions/ui';

const Login = () => {
  const dispatch = useDispatch();
  const { msgError, msgSuccess, isLoading } = useSelector((state) => state.ui);
  const { isLogged } = useSelector((state) => state.auth);

  const [formValue, handleInputChange] = useForm({});

  const { email, password } = formValue;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Form is valid');
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const isFormValid = () => {
    if (!email || !password) {
      dispatch(setError('Todos los campos son obligatorios'));
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      dispatch(setError('Correo electrónico inválido'));
      return false;
    }

    if (password.length < 6) {
      dispatch(setError('La contraseña es de al menos 6 caracteres'));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return isLogged ? (
    <Navigate to='/' />
  ) : (
    <div className='login-container'>
      <div className='login'>
        <div className='form-login'>
          <div className='logos'>
            <img src={cdmx} alt='' />
            <img src={police} alt='' />
          </div>
          <form onSubmit={handleLogin}>
            <div className='message'>
              {msgError && <p className='error-message message'>{msgError}</p>}
              {msgSuccess && (
                <p className='success-message message'>{msgSuccess}</p>
              )}
            </div>
            <label htmlFor='email'>Correo electrónico</label>
            <input
              style={{ textTransform: 'lowercase' }}
              id='email'
              name='email'
              placeholder='example@example.com'
              value={email}
              onChange={handleInputChange}
            />
            <label htmlFor='password'>Contraseña</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Contraseña'
              value={password}
              onChange={handleInputChange}
            />
            <button
              disabled={isLoading}
              className={isLoading ? 'disabled' : ''}
            >
              {isLoading ? <i className='fas fa-spinner'></i> : 'Ingresar'}
            </button>
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
