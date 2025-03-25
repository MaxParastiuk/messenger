import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import './SidebarMenu.css';
const SidebarMenu = ({ toggleTheme, themeMode }) => {
  return (
    <>
      <div className="info-part">
        {themeMode === 'light' ? (
          <img className="logo-app" src={'./light-logo.png'} alt="chat logo" />
        ) : (
          <img className="logo-app" src={'./dark-logo.png'} alt="chat logo" />
        )}

        <div className="user-info">
          <img src="./avatar.png" alt="User image" />
          <p className="user-name">John Doe</p>
        </div>
      </div>
      {/* HAVE TO BE FIXED */}
      <div className="sidebar-options">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'active-option' : '')}
        >
          Messeges
        </NavLink>
        <NavLink
          to="friends"
          className={({ isActive }) => (isActive ? 'active-option' : '')}
        >
          Friends
        </NavLink>
        <ThemeToggle toggleMode={toggleTheme} themeMode={themeMode} />
      </div>

      <button className="logout-btn">logout</button>
    </>
  );
};

export default SidebarMenu;
