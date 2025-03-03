import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const auth = false;

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
