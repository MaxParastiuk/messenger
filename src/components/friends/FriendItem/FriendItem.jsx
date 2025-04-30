import { useState } from 'react';
import './FriendItem.css';
import styled from 'styled-components';
import ConfirmModal from './ConfirmModal/ConfirmModal';

const FriendItem = ({ id, name, avatar, onRemove }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRemoveConfirm = () => {
    onRemove();
    setShowConfirm(false);
  };
  return (
    <>
      <FriendListItem className="friends_list__item">
        <div className="friend-item__left">
          <img src={avatar} alt="avatar" />
          <div className="friend-info">
            <p className="friend-name">{name}</p>
          </div>
        </div>
        <div className="friend-interaction">
          <button
            className="friend-delete-btn"
            aria-label="Remove friend"
            onClick={() => setShowConfirm(true)}
          >
            <span className="btn-text">Unfriend</span>
            <span className="material-icons">person_remove</span>
          </button>
        </div>
      </FriendListItem>
      {showConfirm && (
        <ConfirmModal
          message={`Are you sure you want to remove ${name}?`}
          onConfirm={handleRemoveConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
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
