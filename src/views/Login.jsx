import cdmx from '../assets/cdmx.png';
import police from '../assets/logo-police.png';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { startLoginEmailPassword } from '../redux/actions/auth';
import { setError, removeError } from '../redux/actions/ui';

const Login = () => {
  const dispatch = useDispatch();

  const { msgError, msgSuccess, isLoading } = useSelector((state) => state.ui);
  const { isLogged } = useSelector((state) => state.auth);

  const { register, handleSubmit } = useForm();

  const handleLogin = ({ email, password }) => {
    if (isFormValid(email, password)) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const isFormValid = (email, password) => {
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
          <form onSubmit={handleSubmit(handleLogin)}>
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
