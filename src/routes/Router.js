import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import NotFoundPage from '../views/NotFoundPage';
import Login from '../views/Login';
import Home from '../views/Home';
import Verify from '../views/Verify';
import Search from '../views/Search';
import Tasks from '../views/Tasks';
import Register from '../views/Register';
import GlobalNav from '../components/GlobalNav';
import PrivateRoutes from './PrivateRoutes';
import RegisterUsers from '../views/RegisterUsers';
import { auth } from '../services/firebase/firebaseConfig';
import { getDataUser } from '../services/firebase/getUser';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/auth';
import AdminRoute from './AdminRoute';

const Router = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        getDataUser(user.uid).then((userAuth) => {
          if (userAuth.status === 'active') {
            const loginData = {
              uid: userAuth.uid,
              email: userAuth.email,
              employeeNumber: userAuth.employeeNumber,
              lastName: userAuth.lastName,
              name: userAuth.name,
              role: userAuth.role,
              status: userAuth.status,
            };
            dispatch(login(loginData));
          } else {
            signOut(auth);
          }
        });
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='search' element={<Search />} />
            <Route path='tasks' element={<Tasks />} />
            <Route element={<AdminRoute />}>
              <Route path='registerusers' element={<RegisterUsers />} />
            </Route>
            <Route path='verify' element={<Verify />} />
            <Route path='register' element={<Register />}>
              <Route path=':registerId' element={<Register />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const Layout = () => {
  return (
    <>
      <GlobalNav />
      <div className='content-global'>
        <main className='container'>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Router;
