import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { uid } = useSelector((state) => state.auth);
  return uid.role === 'admin' ? <Outlet /> : <Navigate to='/' />;
};

export default AdminRoute;
