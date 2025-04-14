import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const cachedProfile = localStorage.getItem('userProfile');
  const [userProfile, setUserProfile] = useState(() =>
    cachedProfile ? JSON.parse(cachedProfile) : null,
  );
  const [loading, setLoading] = useState(!cachedProfile);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const profile = userSnap.data();
            setUserProfile(profile);
            localStorage.setItem('userProfile', JSON.stringify(profile));
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
        }
      } else {
        setUserProfile(null);
        localStorage.removeItem('userProfile');
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const registerWithEmail = async ({ email, password, username }) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const uid = result.user.uid;

      // set the username in the Firebase Auth profile
      await updateProfile(result.user, {
        displayName: username,
      });

      const profileData = { email, username };
      await setDoc(doc(db, 'users', uid), profileData);
      setUserProfile(profileData);

      return result.user;
    } catch (error) {
      console.error('Registration failed:', error.code, error.message);
      throw error;
    }
  };

  const loginWithEmail = async ({ email, password }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(email, password, 'email');
    const userRef = doc(db, 'users', result.user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const profile = userSnap.data();
      setUserProfile(profile);
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }

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
      const profileData = {
        email: user.email || '',
        username: user.displayName || 'Anonymous',
        photoURL: user.photoURL || '',
      };
      await setDoc(userRef, profileData);
      setUserProfile(profileData);
    } else {
      setUserProfile(userSnap.data());
    }
    return user;
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
    localStorage.removeItem('userProfile');
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
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
