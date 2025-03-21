import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from './theme/theme';

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
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage toggleTheme={toggleTheme} themeMode={themeMode} />
            }
          ></Route>
          <Route element={<RequireAuth />}>
            <Route
              path="/"
              element={
                <Layout toggleTheme={toggleTheme} themeMode={themeMode} />
              }
            >
              <Route element={<ChatPage />} index></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
