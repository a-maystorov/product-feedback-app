import './BackButton.css';

const BackButton = ({ theme }) => {
  return (
    <button className={`back-btn btn-${theme}`}>
      <svg width="8" height="10" xmlns="http://www.w3.org/2000/svg">
        <path
          className="left-arrow"
          d="M6 9L2 5l4-4"
          stroke="#4661E6"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      <span className="btn-text">Go Back</span>
    </button>
  );
};

export default BackButton;
