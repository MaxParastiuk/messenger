import Switch from 'react-switch';
const ThemeToggle = ({ toggleMode, themeMode, style }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        ...style,
      }}
    >
      <span style={{ marginRight: '8px' }}>Night mode</span>

      <Switch
        checked={themeMode === 'dark' ? true : false}
        onChange={toggleMode}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        uncheckedIcon={false}
        checkedIcon={false}
        handleDiameter={20}
        height={20}
        width={40}
      ></Switch>
    </div>
  );
};
export default ThemeToggle;
