import styled from 'styled-components';
import './ChatConversation.css';
import { useMemo, useState } from 'react';
import Message from '../Message/Message';
import { useChat } from '../../../contexts/ChatContext';
import { useUser } from '../../../contexts/UserContext';

const ChatConversation = () => {
  const { userProfile } = useUser();
  const { activeChat, messages, userCache, sendMessage, isFriend } = useChat();
  const [newMessage, setNewMessage] = useState('');

  const otherUid = activeChat?.participants?.find(
    (uid) => uid !== userProfile?.uid,
  );
  const otherUser = userCache.get(otherUid);

  const groupedMessages = useMemo(() => {
    return messages
      .filter((msg) => msg.timestamp)
      .reduce((groups, msg) => {
        const date = new Date(
          msg.timestamp?.toDate?.() || msg.timestamp,
        ).toLocaleDateString();

        if (!groups[date]) {
          groups[date] = [];
        }

        groups[date].push(msg);
        return groups;
      }, {});
  }, [messages]);

  const hadnleSendMessage = async (value) => {
    if (!newMessage.trim()) return;

    await sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      {!activeChat ? (
        <EmptyChatPlaceholder>
          <PlaceholderIcon>
            <span>&#128172;</span>
          </PlaceholderIcon>
          <PlaceholderText>Select a chat to start messaging</PlaceholderText>
        </EmptyChatPlaceholder>
      ) : (
        <>
          <ChatHeader className="chat-header">
            <div className="current-user">
              <img src={otherUser?.photoURL || './avatar.png'} alt="user img" />
              <div className="current-user-info">
                <p>{otherUser?.username || 'Loading...'}</p>
                <p>Last seen recently</p>
              </div>
            </div>
            <div className="extra-options">
              <button className="call-btn">
                <span className="material-icons">call</span>
              </button>
              <button className="videocall-btn">
                <span className="material-icons">video_call</span>
              </button>
              <button className="more-btn">
                <span className="material-icons">more_vert</span>
              </button>
            </div>
          </ChatHeader>
          <Chat className="chat">
            {Object.entries(groupedMessages).map(([date, msgs]) => (
              <div
                key={date}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <DateSeparator>{date}</DateSeparator>
                {msgs.map((msg) => (
                  <Message
                    key={msg.id}
                    message={msg.text}
                    sender={msg.senderId === userProfile?.uid ? 'me' : 'other'}
                  />
                ))}
              </div>
            ))}
          </Chat>

          {isFriend ? (
            <InputContainer className="input-container">
              <button className="attach-btn">
                <span className="material-icons">attach_file</span>
              </button>
              <textarea
                className="input-message"
                placeholder="Type your Message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    hadnleSendMessage();
                  }
                }}
              />
              <button className="mic-btn">
                <span className="material-icons">mic</span>
              </button>
              <button className="send-btn" onClick={hadnleSendMessage}>
                <span className="material-icons">send</span>
              </button>
            </InputContainer>
          ) : (
            <BlockedChat>You are not friends anymore</BlockedChat>
          )}
        </>
      )}
    </div>
  );
};

const ChatHeader = styled.div`
  background-color: ${({ theme }) => theme.chatSecondBg}};
`;

const Chat = styled.div`
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.scrollbarThumbColor} ${theme.scrollbarBg}`};
`;

const DateSeparator = styled.div`
  font-size: 0.9em;
  align-self: center;
  background-color: ${({ theme }) => theme.dateSeparatorBg};
  border-radius: 25px;
  padding: 5px 10px;
`;

const InputContainer = styled.div`
  display:flex;
  background-color: ${({ theme }) => theme.chatSecondBg}};
`;

const EmptyChatPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: ${({ theme }) => theme.text || '#888'};
  background-color: ${({ theme }) => theme.chatSecondBg};
  padding: 20px;
`;

const PlaceholderIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text || '#0f82ff'};
`;

const PlaceholderText = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;

const BlockedChat = styled.div`
  padding: 20px;
  text-align: center;
  font-style: italic;
`;

export default ChatConversation;
