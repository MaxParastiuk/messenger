import { Outlet } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import styled from 'styled-components';

const Layout = ({ toggleTheme, themeMode }) => {
  const Container = styled.main`
    flex: 1;
    padding: 20px;
    min-height: 100vh;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  `;

  return (
    <Container>
      <aside>
        <SidebarMenu toggleTheme={toggleTheme} themeMode={themeMode} />
      </aside>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default Layout;
