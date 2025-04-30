import styled from 'styled-components';
import FriendItem from '../FriendItem/FriendItem';
import { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { db } from '../../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useFriends } from '../../../contexts/FriendsContext';

const FriendsList = () => {
  const { userProfile } = useUser();
  const { removeFriend } = useFriends();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!userProfile?.uid) return;

    const friendsRef = collection(db, 'users', userProfile.uid, 'friends');

    const unsubscribe = onSnapshot(friendsRef, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFriends(result);
    });

    return () => unsubscribe();
  }, [userProfile?.uid]);

  return (
    <FriendsListContainer>
      <MyFriendsHeadline>My Friends:</MyFriendsHeadline>
      {friends.length === 0 ? (
        <EmptyState>
          <EmptyIcon className="material-icons">person_off</EmptyIcon>
          <EmptyText>You have no friends yet</EmptyText>
        </EmptyState>
      ) : (
        <FriendList className="friends-list">
          {friends.map((friend) => (
            <FriendItem
              key={friend.id}
              name={friend.username}
              avatar={friend.avatar}
              onRemove={() => removeFriend(friend.id)}
            />
          ))}
        </FriendList>
      )}
    </FriendsListContainer>
  );
};

const FriendsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.scrollbarThumbColor} ${theme.scrollbarBg}`};
  flex-basis: 80%;
`;

const MyFriendsHeadline = styled.h3`
  text-transform: uppercase;
  color: #0f82ff;
  letter-spacing: 1px;
  font-weight: 600;
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #888;
  flex: 1;
  justify-content: center;
`;

const EmptyIcon = styled.span`
  font-size: 48px;
  color: #bbb;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  text-align: center;
`;

export default FriendsList;
