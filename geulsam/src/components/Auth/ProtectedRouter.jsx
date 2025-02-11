import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/Auth';

const ProtectedRouter = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouter;
