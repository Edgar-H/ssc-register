import React /* useEffect */ /* useState */ from 'react';
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
import AuthProvider from '../auth/AuthProvider';
import RegisterUsers from '../views/RegisterUsers';

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='search' element={<Search />} />
              <Route path='tasks' element={<Tasks />} />
              <Route path='registerusers' element={<RegisterUsers />} />
              <Route path='verify' element={<Verify />} />
              <Route path='register' element={<Register />}>
                <Route path=':registerId' element={<Register />} />
              </Route>
            </Route>
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
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
