import styled from 'styled-components';

const ChatPage = () => {
  return (
    <ChatContainer>
      <ListChat>
        <div>bla</div>
        <div>bla</div>
        <div>bla</div>
      </ListChat>
      <div>Current Chat</div>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.chatBg};
`;

const ListChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export default ChatPage;
