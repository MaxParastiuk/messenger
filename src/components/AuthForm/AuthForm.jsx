import { useState } from 'react';
import './AuthForm.css';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import SignUpForm from './SignUpForm/SignUpForm';
import LoginForm from './LoginForm/LoginForm';

const AuthForm = ({ themeMode }) => {
  const [isRegister, setRegister] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    if (isRegister) {
      console.log('sing up', data);
    } else {
      console.log('login', data);
    }
  };

  const handleSwitch = (registerMode) => {
    reset();
    setRegister(registerMode);
  };

  return (
    <>
      {themeMode === 'light' ? (
        <img
          className="logo-logpage"
          src={'./light-logo.png'}
          alt="chat logo"
        />
      ) : (
        <img className="logo-logpage" src={'./dark-logo.png'} alt="chat logo" />
      )}
      <div className="auth-switcher">
        <LoginSwitcherBtn
          $isRegister={isRegister}
          onClick={() => {
            handleSwitch(false);
          }}
          className="login-btn"
        >
          login
        </LoginSwitcherBtn>
        <SingupSwitcherBtn
          $isRegister={isRegister}
          onClick={() => {
            handleSwitch(true);
          }}
          className="sign-btn"
        >
          sign up
        </SingupSwitcherBtn>
      </div>
      <div className="form-container">
        <h2 className="form-title">{isRegister ? 'Register' : 'Login'}</h2>
        <div className="alternative-auth">
          <GoogleLogin
            theme="outline"
            size="large"
            width="300"
            text="signin_with"
            shape="pill"
            onSuccess={(response) => console.log('Success:', response)}
            onError={() => console.log('Error')}
          />
        </div>

        <div className="divider">
          <span>OR</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isRegister ? (
            <SignUpForm
              register={register}
              watch={watch}
              errors={errors}
              touchedFields={touchedFields}
            ></SignUpForm>
          ) : (
            <LoginForm
              register={register}
              errors={errors}
              touchedFields={touchedFields}
            ></LoginForm>
          )}

          <SubmitBtn type="submit">
            {isRegister ? 'Sign Up' : 'Log In'}
          </SubmitBtn>
        </form>
      </div>
    </>
  );
};

const LoginSwitcherBtn = styled.button`
  background-color: ${({ theme, $isRegister }) =>
    $isRegister === false ? theme.authSwitcherActiveBg : theme.authSwitcherBg};
  padding: 10px 10px;
  font-size: 16px;
  flex: 1;
  border-radius: 7px 0 0 7px;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(90%);
  }
`;

const SingupSwitcherBtn = styled.button`
  background-color: ${({ theme, $isRegister }) =>
    $isRegister === true ? theme.authSwitcherActiveBg : theme.authSwitcherBg};
  padding: 10px 10px;
  font-size: 16px;
  flex: 1;
  border-radius: 0 7px 7px 0;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(90%);
  }
`;

const SubmitBtn = styled.button`
  background-color: ${({ theme }) => theme.authSwitcherActiveBg};
  padding: 10px 15px;
  border-radius: 10px;
  transition: transform 0.1s ease, filter 0.2s ease;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    filter: brightness(90%);
  }
`;

export default AuthForm;
