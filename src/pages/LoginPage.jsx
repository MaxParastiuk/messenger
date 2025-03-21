import styled from 'styled-components';
import ThemeToggle from '../components/ThemeToggle';
import AuthForm from '../components/AuthForm/AuthForm';

const LoginPage = ({ toggleTheme, themeMode }) => {
  return (
    <Container>
      <ThemeToggle
        toggleMode={toggleTheme}
        themeMode={themeMode}
        style={{ marginTop: '20px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', flex: '1' }}>
        <LoginContainer>
          <LoginWindow>
            <AuthForm themeMode={themeMode}></AuthForm>
          </LoginWindow>
        </LoginContainer>
      </div>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 0;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoginWindow = styled.div`
  background-color: ${({ theme }) => theme.mainBg};
  padding: 20px;
  border-radius: 10px;
`;
