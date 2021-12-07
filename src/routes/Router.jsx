import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import NotFoundPage from '../views/NotFoundPage';
import Login from '../views/Login';
import Home from '../views/Home';
import Verify from '../views/Verify';
import Search from '../views/Search';
import Tasks from '../views/Tasks';
import Register from '../views/Register';
import GlobalNav from '../components/GlobalNav';

const Router = () => {
  const [userAuth, setUserAuth] = useState();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('logged_in');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserAuth(user);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='search' element={<Search />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='verify' element={<Verify />} />
          <Route path='register' element={<Register />}>
            <Route path=':registerId' element={<Register />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

const Layout = () => {
  return (
    <>
      <GlobalNav />
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
};

export default Router;
