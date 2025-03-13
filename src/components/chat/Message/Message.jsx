import styled from 'styled-components';

const Message = ({ message, sender }) => {
  return <Bubble sender={sender}>{message}</Bubble>;
};

const Bubble = styled.div`
  color: white;
  max-width: 60%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  background-color: ${({ sender, theme }) =>
    sender === 'me' ? theme.myMessageBg : theme.otherMessageBg};
  align-self: ${({ sender }) => (sender === 'me' ? 'flex-end' : 'flex-start')};
`;

export default Message;
