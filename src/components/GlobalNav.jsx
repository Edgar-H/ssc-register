import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogoutService } from '../hooks/useAuth';
import logo from '../assets/logo.png';

const GlobalNav = () => {
  const navigate = useNavigate();
  const logout = () => {
    LogoutService();
    navigate('login', { replace: true });
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
          <li onClick={() => logout()}>
            <i className='fas fa-user'></i>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default GlobalNav;
