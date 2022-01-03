import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../redux/actions/auth';

const GlobalNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  const logoutUser = () => {
    dispatch(startLogout());
    navigate('/login');
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
          {uid.role === 'admin' && (
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
