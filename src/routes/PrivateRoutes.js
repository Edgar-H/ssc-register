import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const PrivateRoutes = () => {
  const user = useAuth();
  return user.userAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
