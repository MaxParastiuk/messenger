import styled from 'styled-components';
import './ChatListItem.css';
import { useUser } from '../../../contexts/UserContext';
import { useChat } from '../../../contexts/ChatContext';

const ChatListItem = ({ chat, isActive, onClick }) => {
  const { userProfile } = useUser();
  const { userCache } = useChat();

  // find the conversation partner id
  const otherUid = chat.participants.find((uid) => uid !== userProfile?.uid);
  const otherUser = userCache.get(otherUid);

  const isLoaded = Boolean(otherUser);

  return (
    <UserMessege
      className="user-message"
      onClick={onClick}
      style={{
        border: isActive ? '2px solid #0f82ff' : 'none',
      }}
    >
      {otherUser?.photoURL ? (
        <img src={otherUser.photoURL} alt="profile img" />
      ) : (
        <AvatarPlaceholder />
      )}
      <div className="message-block">
        <p className="user-name">{isLoaded ? otherUser.username : ' '}</p>
        <p className="short-message">
          {isLoaded ? chat.lastMessage?.text || 'No messages yet' : ' '}
        </p>
      </div>
    </UserMessege>
  );
};

const UserMessege = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.userBg};
  gap: 15px;
  padding: 10px 5px;
  align-items: center;
  border-radius: 5px;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverChatItemBg};
    transform: translateY(-1px);
  }
`;

const AvatarPlaceholder = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 100%;
`;
export default ChatListItem;
