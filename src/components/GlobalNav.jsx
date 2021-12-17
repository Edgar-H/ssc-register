import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import useAuth from '../auth/useAuth';
import app from '../services/firebase/firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';

const GlobalNav = () => {
  const auth = getAuth(app);
  const { logout, userAuth } = useAuth();

  const logoutUser = () => {
    logout();
    signOut(auth);
  };

  return (
    <nav>
      <div className='content'>
        <div className='logo'>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <ul>
          <li>
            <NavLink
              to='/'
              className={`active-none ${({ isActive }) =>
                isActive ? 'active' : ''}`}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to='/search'>Buscar</NavLink>
          </li>
          <li>
            <NavLink to='/tasks'>Tareas</NavLink>
          </li>
          <li>
            <NavLink to='/verify'>Registrar</NavLink>
          </li>
          {userAuth.role === 'admin' && (
            <li>
              <NavLink to='/registerusers'>Usuarios</NavLink>
            </li>
          )}

          <li onClick={logoutUser}>
            <i className='fas fa-user'></i>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default GlobalNav;
