import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Navigate, Outlet } from 'react-router-dom';

const RequireGuest = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return null;

  if (user) {
    <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireGuest;
