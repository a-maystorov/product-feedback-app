import './Navbar.css';

const NavBar = ({ onClick, menuOpen, windowWidth }) => {
  return (
    <div className="navbar">
      <header className="navbar__header">
        <h1>Frontend Mentor</h1>
        <p>Feedback Board</p>
      </header>
      <div
        className={`menu-btn ${windowWidth < 768 ? null : 'd-none'}`}
        onClick={onClick}>
        <svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">
          <g fill="#FFF" fillRule="evenodd">
            <path
              d={
                !menuOpen
                  ? 'M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z'
                  : 'M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z'
              }
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default NavBar;
