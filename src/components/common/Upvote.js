import { useState } from 'react';
import './Upvote.css';

const Upvote = ({ direction, upvotes }) => {
  const [isActive, setIsActive] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(upvotes);

  const handleToggle = () => {
    setIsActive(!isActive);
    if (!isActive) setUpvotesCount(upvotesCount + 1);
    if (isActive) setUpvotesCount(upvotesCount - 1);
  };

  return (
    <button
      className={`upvote direction-${direction} ${isActive ? 'active' : null}`}
      onClick={handleToggle}>
      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
        <path
          className="up-arrow"
          d="M1 6l4-4 4 4"
          stroke="#4661E6"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      {upvotesCount}
    </button>
  );
};

export default Upvote;
