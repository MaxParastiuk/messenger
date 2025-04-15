import './AuthForm.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import SignUpForm from './SignUpForm/SignUpForm';
import LoginForm from './LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/UserContext';

const AuthForm = ({ themeMode }) => {
  const navigate = useNavigate();
  const { loginWithEmail, registerWithEmail, signInWithGoogle, userProfile } =
    useUser();
  const [isRegister, setRegister] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (userProfile) {
      navigate('/', { replace: true });
    }
  }, [userProfile, navigate]);

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        await registerWithEmail(data);
        toast.success('Registration successful');
      } else {
        await loginWithEmail(data);
        console.log(userProfile, 'userProfile');
        toast.success('Logged in successfully');
      }
      // navigate('/');
    } catch (error) {
      const firebaseErrorMap = {
        'auth/email-already-in-use': 'Email is already in use',
        'auth/invalid-email': 'Invalid email address',
        'auth/user-not-found': 'User not found',
        'auth/network-request-failed': 'Network error, check connection',
      };
      const message = firebaseErrorMap[error.code] || 'Authentication failed';

      toast.error(message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google');
      navigate('/');
    } catch (error) {
      toast.error('Google sign-in failed');
      console.error(error);
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
          <button onClick={handleGoogleSignIn} className="google-login-btn">
            <img src="/g-logo.png" alt="Google" />
            Continue with Google
          </button>
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
