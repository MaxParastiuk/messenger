import { Outlet } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

const Layout = () => {
  return (
    <div className="container">
      <aside>
        <SidebarMenu />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
