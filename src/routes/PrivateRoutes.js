import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const { isLogged } = useSelector((state) => state.auth);
  return isLogged ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
