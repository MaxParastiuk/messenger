import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { useUser } from './UserContext';

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const { userProfile } = useUser();
  const [chats, setChats] = useState([]);
  const [activateChatId, setActivateChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userCache, setUserCache] = useState(new Map());
  const [isFriend, setIsFriend] = useState(true);

  const activeChat = chats.find((chat) => chat.id === activateChatId) || null;

  // chat subscription
  useEffect(() => {
    if (!userProfile?.uid) return;

    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', userProfile.uid),
    );

    const unsub = onSnapshot(q, (snap) => {
      const result = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

      setChats(result);
    });

    return () => unsub();
  }, [userProfile?.uid]);

  // activated chat subsription
  useEffect(() => {
    if (!activateChatId) return;

    const q = query(
      collection(db, 'chats', activateChatId, 'messages'),
      orderBy('timestamp', 'asc'),
    );

    const unsub = onSnapshot(q, (snap) => {
      const result = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(result);
    });

    return () => unsub();
  }, [activateChatId]);

  /* 
    When chats are loaded, collect all unique participants (excluding current user)
    and fetch their user profiles from Firestore only if not already cached.
  */
  useEffect(() => {
    if (!userProfile?.uid || chats.length === 0) return;

    const allUids = chats
      .flatMap((chat) => chat.participants)
      .filter((uid) => uid !== userProfile.uid);

    const uniqueUids = [...new Set(allUids)];
    const missing = uniqueUids.filter((uid) => !userCache.has(uid));

    if (missing.length === 0) return;

    (async () => {
      const docs = await Promise.all(
        missing.map(async (uid) => {
          const snap = await getDoc(doc(db, 'users', uid));
          return snap.exists() ? [uid, snap.data()] : null;
        }),
      );

      const updated = new Map(userCache);
      docs.filter(Boolean).forEach(([uid, data]) => updated.set(uid, data));
      setUserCache(updated);
    })();
  }, [chats, userProfile?.uid, userCache]);

  // real-time check if uesrs still friends
  useEffect(() => {
    if (!userProfile?.uid || !activeChat) return;

    const otherUid = activeChat.participants.find(
      (uid) => uid !== userProfile.uid,
    );

    if (!otherUid) return;

    const friendRef = doc(db, 'users', userProfile.uid, 'friends', otherUid);

    const unsub = onSnapshot(friendRef, (snap) => {
      setIsFriend(snap.exists());
    });

    return () => unsub();
  }, [userProfile?.uid, activeChat]);

  const selectChat = (chatId) => {
    setActivateChatId(chatId);
  };

  const sendMessage = async (text) => {
    if (!activateChatId || !text.trim() || !userProfile.uid) return;

    try {
      const messageRef = collection(db, 'chats', activateChatId, 'messages');

      await addDoc(messageRef, {
        text: text.trim(),
        senderId: userProfile.uid,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activateChatId,
        messages,
        activeChat,
        userCache,
        sendMessage,
        selectChat,
        isFriend,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
