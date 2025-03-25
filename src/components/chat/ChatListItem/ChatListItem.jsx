import styled from 'styled-components';
import './ChatListItem.css';

const ChatListItem = () => {
  return (
    <UserMessege className="user-message">
      <img src="./avatar.png" alt="profile img" />
      <div className="message-block">
        <p className="user-name">John Doe</p>
        <p className="short-message">message</p>
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
`;

export default ChatListItem;
