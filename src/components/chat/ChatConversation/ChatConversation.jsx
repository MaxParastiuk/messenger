import styled from 'styled-components';
import './ChatConversation.css';
import { useMemo, useState } from 'react';
import Message from '../Message/Message';

const ChatConversation = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'other',
      text: 'Hello, how are you?',
      timestamp: '2025-03-16T10:15:00Z',
    },
    {
      id: 2,
      sender: 'me',
      text: 'Hello! Im fine, and you?',
      timestamp: '2025-03-16T10:15:00Z',
    },
    {
      id: 3,
      sender: 'other',
      text: 'Im too',
      timestamp: '2025-03-17T09:05:00Z',
    },
    {
      id: 4,
      sender: 'other',
      text: 'Im too',
      timestamp: '2025-03-17T09:05:00Z',
    },
    {
      id: 5,
      sender: 'other',
      text: 'Im too',
      timestamp: '2025-03-17T09:05:00Z',
    },
    {
      id: 6,
      sender: 'other',
      text: 'Im too',
      timestamp: '2025-03-17T09:05:00Z',
    },
    {
      id: 7,
      sender: 'other',
      text: 'Im too',
      timestamp: '2025-03-17T09:05:00Z',
    },
    {
      id: 8,
      sender: 'other',
      text: 'Im too',
      timestamp: '2025-03-17T09:05:00Z',
    },
    {
      id: 9,
      sender: 'other',
      text: 'Im too',
      timestamp: '2025-03-17T09:05:00Z',
    },
    {
      id: 10,
      sender: 'other',
      text: 'Im too',
      timestamp: '2025-03-17T09:05:00Z',
    },
    {
      id: 11,
      sender: 'other',
      text: 'Im too',
      timestamp: '2025-03-17T09:05:00Z',
    },
  ]);

  const groupedMessages = useMemo(() => {
    return messages.reduce((groups, msg) => {
      const date = new Date(msg.timestamp).toLocaleDateString();

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(msg);
      return groups;
    }, {});
  }, [messages]);

  return (
    <div className="chat-container">
      <ChatHeader className="chat-header">
        <div className="current-user">
          <img src="./avatar.png" alt="user img" />
          <div className="current-user-info">
            <p>John Doe</p>
            <p>Last seen 02:55 pm</p>
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
          <div key={date} style={{ display: 'flex', flexDirection: 'column' }}>
            <DateSeparator>{date}</DateSeparator>
            {msgs.map((msg) => (
              <Message key={msg.id} message={msg.text} sender={msg.sender} />
            ))}
          </div>
        ))}
      </Chat>
      <InputContainer className="input-container">
        <button className="attach-btn">
          <span className="material-icons">attach_file</span>
        </button>
        <textarea
          className="input-message"
          placeholder="Type your Message..."
        />
        <button className="mic-btn">
          <span className="material-icons">mic</span>
        </button>
        <button className="send-btn">
          <span className="material-icons">send</span>
        </button>
      </InputContainer>
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

export default ChatConversation;
