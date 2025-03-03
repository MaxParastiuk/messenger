const SidebarMenu = () => {
  return (
    <div className="sidebar-container">
      <div className="user-info">
        <img src="./avatar.png" alt="User image" />
        <p className="user-name">John Doe</p>
      </div>
      <div className="options">
        <p>Messeges</p>
        <p>Contact</p>
        <p>Settings</p>
        <p>Night mode</p>
        <button>log out</button>
      </div>
    </div>
  );
};

export default SidebarMenu;
