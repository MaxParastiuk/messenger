import { Outlet } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import styled from 'styled-components';
import './Layout.css';

const Layout = ({ toggleTheme, themeMode }) => {
  return (
    <Container>
      <div className="inner-container">
        <aside className="sidebar-container">
          <SidebarMenu toggleTheme={toggleTheme} themeMode={themeMode} />
        </aside>
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const MainContainer = styled.main`
  padding: 20px;
  background-color: ${({ theme }) => theme.mainBg};
`;

export default Layout;
