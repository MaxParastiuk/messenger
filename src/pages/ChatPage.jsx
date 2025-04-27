import styled from 'styled-components';
import ChatListItem from '../components/chat/ChatListItem/ChatListItem';
import ChatConversation from '../components/chat/ChatConversation/ChatConversation';
import { useChat } from '../contexts/ChatContext';

const ChatPage = () => {
  const { chats, selectChat, activeChatId } = useChat();
  return (
    <ChatContainer>
      <ChatList>
        <ChatListHealine>Messeges</ChatListHealine>
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onClick={() => selectChat(chat.id)}
          />
        ))}
      </ChatList>
      <ChatConversation />
    </ChatContainer>
  );
};

const ChatListHealine = styled.div`
  text-transform: uppercase;
  color: #0f82ff;
  letter-spacing: 3px;
  font-weight: 600;
`;
const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.chatBg};
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
  padding: 20px 10px;
  border-right: ${({ theme }) => theme.border};
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.scrollbarThumbColor} ${theme.scrollbarBg}`};
`;

export default ChatPage;
