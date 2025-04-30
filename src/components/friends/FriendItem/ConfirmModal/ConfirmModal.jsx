import styled from 'styled-components';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <Overlay>
      <Modal>
        <Message>{message}</Message>
        <Actions>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>Delete</ConfirmButton>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default ConfirmModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.chatSecondBg};
  padding: 24px;
  border-radius: 12px;
  max-width: 320px;
  width: 100%;
  text-align: center;
`;

const Message = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background: #3c40b8;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease-out;

  &:hover {
    background: #437293;
  }
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  background: #850e18;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease-out;

  &:hover {
    background: #b01d27;
  }
`;
