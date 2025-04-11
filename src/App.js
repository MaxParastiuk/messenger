import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from './theme/theme';
import FriendsPage from './pages/FriendsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireGuest from './components/RequireGuest';

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={themeMode}
        />
        <Routes>
          <Route element={<RequireGuest />}>
            <Route
              path="/login"
              element={
                <LoginPage toggleTheme={toggleTheme} themeMode={themeMode} />
              }
            ></Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route
              path="/"
              element={
                <Layout toggleTheme={toggleTheme} themeMode={themeMode} />
              }
            >
              <Route element={<ChatPage />} index></Route>
              <Route path="friends" element={<FriendsPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
