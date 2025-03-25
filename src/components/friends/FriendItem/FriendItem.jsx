import './FriendItem.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const FriendItem = ({ id, name, avatar, status }) => {
  return (
    <FriendListItem className="friends_list__item">
      <div className="friend-item__left">
        <img src={avatar} alt="avatar" />
        <div className="friend-info">
          <p className="friend-name">{name}</p>
          <span className="friend-status">{status}</span>
        </div>
      </div>
      <div className="friend-interaction">
        <button className="friend-delete-btn" aria-label="Remove friend">
          <span className="btn-text">Unfriend</span>
          <span class="material-icons">person_remove</span>
        </button>
      </div>
    </FriendListItem>
  );
};

const FriendListItem = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: ${({ theme }) => theme.userBg};
  padding: 10px;
  border-radius: 10px;
`;

export default FriendItem;
