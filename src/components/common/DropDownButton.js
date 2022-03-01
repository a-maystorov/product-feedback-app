import './DropDownButton.css';

const DropDownButton = ({ onClick, currentSortCriteria, isOpen }) => {
  return (
    <div
      className={`dd-btn ${isOpen ? 'dd-btn--open' : null}`}
      onClick={onClick}>
      <span className="dd-btn__sort-by">Sort by :</span>
      <span className="dd-btn__criteria">{currentSortCriteria}</span>
      <svg
        width="10"
        height="7"
        xmlns="http://www.w3.org/2000/svg"
        transform={isOpen ? 'rotate(180)' : null}>
        <path
          className="dd-btn__down-arrow"
          d="M1 1.5l4 4 4-4"
          stroke="#4661E6"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default DropDownButton;
