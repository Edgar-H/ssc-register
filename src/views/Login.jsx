import React, { useState /* useEffect */ } from 'react';
import { LoginService } from '../hooks/useAuth';
import cdmx from '../assets/cdmx.png';
import police from '../assets/logo-police.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState(),
    [password, setPassword] = useState(),
    [error, setError] = useState(),
    [success, setSuccess] = useState();

  /* useEffect(() => {
    setError('Por favor ingresa usuario y contraseña');
    setSuccess('Acceso correcto');
  }, []); */

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      return setError('Por favor ingresa usuario y contraseña');
    }

    const saveAuth = (user) => {
      window.localStorage.setItem('logged_in', JSON.stringify(user));
    };

    try {
      const getAuth = await LoginService({ username, password });
      saveAuth(getAuth);
      setSuccess('Acceso correcto');
      setUsername('');
      setPassword('');
      navigate('/', { replace: true });
    } catch (err) {
      switch (err.message) {
        case 'wrong-password':
          setError('Contraseña inavlida');
          break;
        case 'user-not-found':
          setError('Usuario incorrecto');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <div className='form-login'>
          <div className='logos'>
            <img src={cdmx} alt='' />
            <img src={police} alt='' />
          </div>
          <form onSubmit={signIn}>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            <label htmlFor='username'>Nombre de usuario</label>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='username'
              onChange={(target) => setUsername(target.value)}
            />
            <label htmlFor='password'>Contraseña</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Contraseña'
              onChange={(target) => setPassword(target.value)}
            />
            <button type='submit'>Ingresar</button>
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
