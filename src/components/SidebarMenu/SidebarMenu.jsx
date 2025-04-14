import { NavLink, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import './SidebarMenu.css';
import { useUser } from '../../contexts/UserContext';

const SidebarMenu = ({ toggleTheme, themeMode }) => {
  const { userProfile, loading, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div className="info-part">
        {themeMode === 'light' ? (
          <img className="logo-app" src={'./light-logo.png'} alt="chat logo" />
        ) : (
          <img className="logo-app" src={'./dark-logo.png'} alt="chat logo" />
        )}

        {!loading && userProfile && (
          <div className="user-info">
            <img
              src={userProfile.photoURL || './avatar.png'}
              alt="User avatar"
              className="user-avatar"
            />
            <p className="user-name">{userProfile.username}</p>
          </div>
        )}
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

      <button className="logout-btn" onClick={handleLogout}>
        logout
      </button>
    </>
  );
};

export default SidebarMenu;
