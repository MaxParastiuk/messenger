import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const registerWithEmail = async ({ email, password, username }) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const uid = result.user.uid;

    await setDoc(doc(db, 'users', uid), {
      email,
      username,
    });

    return result.user;
  };

  const loginWithEmail = async ({ email, password }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    return result.user;
  };

  // Login with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    // Create profile only once (on first login)
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email || '',
        username: user.displayName || 'Anonymous',
        photoURL: user.photoURL || '',
      });
    }
    return user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        registerWithEmail,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
