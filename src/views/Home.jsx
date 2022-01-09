import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { counterProfiles } from '../services/firebase/counterProfiles';

const Home = () => {
  const [counter, setCounter] = useState(0);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    counterProfiles().then((count) => {
      setCounter(count);
    });
  }, []);

  return (
    <>
      <div className='home'>
        <h5>Hola {uid.name}</h5>
        <div className='card-containter'>
          <div className='card'>
            <div className='info'>
              <h4>{counter}</h4>
              <h3>Registro</h3>
            </div>
            <i className='fas fa-vote-yea'></i>
          </div>
          <div className='card'>
            <div className='info'>
              <h4>13</h4>
              <h3>Tareas</h3>
            </div>
            <i className='fas fa-tasks'></i>
          </div>
        </div>
        <div className='activities'>
          <p>¿Que vamos a hacer hoy?</p>
          <div className='btns'>
            <Link to='search'>
              <button>Buscar</button>
            </Link>
            <Link to='verify'>
              <button>Registrar detenido</button>
            </Link>
            <Link to='registerusers'>
              <button>Administrar usuarios</button>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
