import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

const ProtectedRoute = () => {
  const { isLoading, user } = useUser();
  if (!isLoading && user) return <Outlet />;
  else return <Navigate to="/login" />;
};

export default ProtectedRoute;
