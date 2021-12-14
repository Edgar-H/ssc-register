import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const PrivateRoutes = () => {
  const auth = useAuth();
  return auth.userAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
