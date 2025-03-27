import './FriendRequestsModal.css';
import styled from 'styled-components';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

const FriendRequestsModal = ({ requests, onAccept, onDecline, onClose }) => {
  return (
    <ModalWrapper
      titleId="requests-title"
      titleText="Frien Requests"
      onClose={onClose}
    >
      <ScrollArea className="friend-requests__scroll-area">
        {requests.length === 0 ? (
          <div className="friend-requests__empty">No requests!</div>
        ) : (
          requests.map((request) => (
            <RequestItem className="friend-requests__item" key={request.id}>
              <span>{request.name}</span>
              <div className="friend-requests__controls">
                <button
                  className="request-accept-btn"
                  onClick={() => onAccept(request.id)}
                >
                  Accept
                </button>
                <button
                  className="request-decline-btn"
                  onClick={() => onDecline(request.id)}
                >
                  Decline
                </button>
              </div>
            </RequestItem>
          ))
        )}
      </ScrollArea>
    </ModalWrapper>
  );
};

const ScrollArea = styled.div`
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.scrollbarThumbColor} ${theme.scrollbarBg}`};
`;

const RequestItem = styled.div`
  border: ${({ theme }) => theme.border};
`;
export default FriendRequestsModal;
