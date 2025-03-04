import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const auth = true;

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
