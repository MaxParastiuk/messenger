import styled from 'styled-components';
import FriendItem from '../FriendItem/FriendItem';
const FriendsList = () => {
  const friends = [
    { id: 1, name: 'Teem', status: 'online', avatar: './avatar.png' },
    { id: 2, name: 'Rik', status: 'online', avatar: './avatar.png' },
    { id: 3, name: 'Jek', status: 'online', avatar: './avatar.png' },
    { id: 4, name: 'Katy', status: 'online', avatar: './avatar.png' },
    { id: 5, name: 'Rina', status: 'ofline', avatar: './avatar.png' },
    { id: 6, name: 'Arin', status: 'online', avatar: './avatar.png' },
  ];
  return (
    <FriendsListContainer>
      <h3>My Friends:</h3>
      <FriendList className="friends-list">
        {friends.map((friend) => (
          <FriendItem
            key={friend.id}
            name={friend.name}
            status={friend.status}
            avatar={friend.avatar}
          ></FriendItem>
        ))}
      </FriendList>
    </FriendsListContainer>
  );
};

const FriendsListContainer = styled.div`
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.scrollbarThumbColor} ${theme.scrollbarBg}`};
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default FriendsList;
