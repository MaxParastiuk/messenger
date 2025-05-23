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
            const profileFromDb = userSnap.data();
            const profile = {
              uid: firebaseUser.uid,
              ...profileFromDb,
            };

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

      const photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        username,
      )}&background=random`;

      const profileData = {
        email,
        username,
        usernameLower: username.toLowerCase(),
        photoURL,
      };
      await setDoc(doc(db, 'users', uid), profileData);
      setUserProfile({ ...profileData, uid });

      return result.user;
    } catch (error) {
      console.error('Registration failed:', error.code, error.message);
      throw error;
    }
  };

  const loginWithEmail = async ({ email, password }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, 'users', result.user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const profile = userSnap.data();
      setUserProfile({ ...profile, uid: result.user.uid });
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

    const photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.displayName,
    )}&background=random`;

    // Create profile only once (on first login)
    if (!userSnap.exists()) {
      const profileData = {
        email: user.email || '',
        username: user.displayName || 'Anonymous',
        usernameLower: user.displayName.toLowerCase(),
        photoURL,
      };
      await setDoc(userRef, profileData);
      setUserProfile({ ...profileData, uid: user.uid });
    } else {
      setUserProfile({ ...userSnap.data(), uid: user.uid });
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
