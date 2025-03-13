import styled from 'styled-components';
import './ChatConversation.css';
import { useState } from 'react';
import Message from '../Message/Message';

const ChatConversation = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Hello, how are you?' },
    { id: 2, sender: 'me', text: 'Hello! Im fine, and you?' },
    { id: 3, sender: 'other', text: 'Im too' },
    { id: 4, sender: 'other', text: 'Im too' },
    { id: 5, sender: 'other', text: 'Im too' },
    { id: 6, sender: 'other', text: 'Im too' },
    { id: 7, sender: 'other', text: 'Im too' },
    { id: 8, sender: 'other', text: 'Im too' },
    { id: 9, sender: 'other', text: 'Im too' },
    { id: 10, sender: 'other', text: 'Im too' },
    { id: 11, sender: 'other', text: 'Im too' },
  ]);
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
        {messages.map((msg) => (
          <Message key={msg.id} message={msg.text} sender={msg.sender} />
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

const InputContainer = styled.div`
  display:flex;
  background-color: ${({ theme }) => theme.chatSecondBg}};
`;

export default ChatConversation;
