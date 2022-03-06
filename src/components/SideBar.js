import CategoryList from './CategoryList';
import Roadmap from './Roadmap';
import './Sidebar.css';

const SideBar = ({
  menuOpen,
  currentCategory,
  changeCategory,
  plannedLength,
  inProgressLength,
  liveLength,
  handleMenuToggle,
  windowWidth,
}) => {
  return (
    <div className={`sidebar ${!menuOpen ? 'd-none' : null}`}>
      <CategoryList
        currentCategory={currentCategory}
        changeCategory={changeCategory}
      />
      <Roadmap
        plannedLength={plannedLength}
        inProgressLength={inProgressLength}
        liveLength={liveLength}
        handleMenuToggle={handleMenuToggle}
        windowWidth={windowWidth}
      />
    </div>
  );
};

export default SideBar;
