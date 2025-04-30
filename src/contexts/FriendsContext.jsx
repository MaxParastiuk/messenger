import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const FriendsContext = createContext();
export const FriendsProvider = ({ children }) => {
  const [incomingRequests, setIncomingRequests] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const q = query(
        collection(db, 'friendRequests'),
        where('to', '==', user.uid),
        where('status', '==', 'pending'),
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const requests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncomingRequests(requests);
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsub();
  }, []);

  const sendFriendRequest = async (username) => {
    const currentUser = auth.currentUser;

    if (!currentUser) throw new Error('Not authenticated');

    const q = query(
      collection(db, 'users'),
      where('usernameLower', '==', username.toLowerCase()),
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) throw new Error('User not found');

    const userUid = snapshot.docs[0].id;
    if (userUid === currentUser.uid) throw new Error("You can't add yourself");

    const requestId = `${currentUser.uid}_${userUid}`;
    await setDoc(doc(db, 'friendRequests', requestId), {
      from: currentUser.uid,
      to: userUid,
      fromUsername: currentUser.displayName || 'Unknown',
      status: 'pending',
      timeStamp: serverTimestamp(),
    });
  };

  const acceptFriendRequest = async (id) => {
    const requestRef = doc(db, 'friendRequests', id);
    const requestSnap = await getDoc(requestRef);
    if (!requestSnap.exists()) throw new Error('Request not found ');

    const { from, to } = requestSnap.data();

    // the chat-ID is unique regardless of order
    const sorted = [from, to].sort();
    const chatId = `${sorted[0]}_${sorted[1]}`;

    const chatRef = doc(db, 'chats', chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: sorted,
        createdAt: serverTimestamp(),
        lastMessage: null,
      });
    }

    // update request status
    await updateDoc(doc(db, 'friendRequests', id), {
      status: 'accepted',
    });

    const fromRef = doc(db, 'users', from);
    const toRef = doc(db, 'users', to);

    // add each other to friends
    const [fromSnap, toSnap] = await Promise.all([
      getDoc(fromRef),
      getDoc(toRef),
    ]);
    const fromData = fromSnap.data();
    const toData = toSnap.data();

    await Promise.all([
      setDoc(doc(db, 'users', from, 'friends', to), {
        uid: to,
        username: toData.username,
        avatar: toData.photoURL,
      }),
      setDoc(doc(db, 'users', to, 'friends', from), {
        uid: from,
        username: fromData.username,
        avatar: fromData.photoURL,
      }),
    ]);
  };

  const declineFriendRequest = async (id) => {
    await deleteDoc(doc(db, 'friendRequests', id));
  };

  const removeFriend = async (friendUid) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');

    try {
      // Remove from me
      await deleteDoc(doc(db, 'users', currentUser.uid, 'friends', friendUid));

      // Remove from friend
      await deleteDoc(doc(db, 'users', friendUid, 'friends', currentUser.uid));
    } catch (error) {
      console.error('Failed to remove friend:', error);
      throw error;
    }
  };
  return (
    <FriendsContext.Provider
      value={{
        incomingRequests,
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        removeFriend,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => useContext(FriendsContext);
