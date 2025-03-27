import { useState } from 'react';
import './FriendsHeader.css';
import styled from 'styled-components';
import FriendRequestsModal from '../modals/FriendRequestsModal/FriendRequestsModal';
import AddFriendModal from '../modals/AddFriendModal/AddFriendModal';
const FriendsHeader = ({ requestCount = 1 }) => {
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const requests = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'Diana Prince' },
    { id: 5, name: 'Ethan Hunt' },
    { id: 6, name: 'Fiona Gallagher' },
    { id: 7, name: 'George Washington' },
    { id: 8, name: 'Hannah Montana' },
    { id: 9, name: 'Ian Curtis' },
    { id: 10, name: 'Jasmine Lee' },
  ];
  return (
    <>
      <FriendsHeaderContainer className="friends-list-header">
        <FriendsListHeadline>Friends List</FriendsListHeadline>
        <div className="friends-controls">
          <div className="friends-search">
            <SearchInput
              type="text"
              id="search-friend"
              name="search-friend"
              placeholder="Search friend..."
              aria-label="Search friend"
            />
            <SearchIcon className="material-icons">search</SearchIcon>
          </div>

          <div className="friends-panel">
            <button
              className="friends-panel__requests"
              aria-label="Open friend requests"
              onClick={() => setShowRequestsModal(true)}
            >
              <span className="btn-text">Requests</span>
              <span className="material-icons">diversity_1</span>
              {requestCount > 0 && (
                <span className="requests_notification__badge">
                  {requestCount}
                </span>
              )}
            </button>
            <button
              className="friends-panel__add"
              aria-label="Add a new friend"
              onClick={() => setShowAddFriendModal(true)}
            >
              <span className="btn-text">Add Friend</span>
              <span className="material-icons">person_add</span>
            </button>
          </div>
        </div>
      </FriendsHeaderContainer>
      {showRequestsModal && (
        <FriendRequestsModal
          requests={requests}
          onAccept={() => console.log('hello')}
          onDecline={() => console.log('hello')}
          onClose={() => setShowRequestsModal(false)}
        />
      )}
      {showAddFriendModal && (
        <AddFriendModal
          onAdd={() => console.log('hello')}
          onClose={() => setShowAddFriendModal(false)}
        />
      )}
    </>
  );
};

const FriendsHeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.friendsHeaderBg};
`;

const FriendsListHeadline = styled.h2`
  text-transform: uppercase;
  color: #0f82ff;
  letter-spacing: 3px;
  font-weight: 600;
`;

const SearchInput = styled.input`
  padding: 0.5rem 2.4rem 0.5rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 1rem;
  min-width: 250px;
  outline: none;
  background: #ffffff;
  color: #333;
  transition: all 0.3s ease;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }

  &:hover {
    border-color: #bbb;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  &:focus {
    border-color: #0f82ff;
    box-shadow: 0 0 0 3px rgba(15, 130, 255, 0.25);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 0.6rem;
  color: #888;
  pointer-events: none;
`;

export default FriendsHeader;
