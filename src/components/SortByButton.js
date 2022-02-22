import { useState, useRef, useEffect } from 'react';
import DropDownButton from './common/DropDownButton';
import DropDownCard from './common/DropDownCard';

const sortingCriteria = [
  'Most Upvotes',
  'Least Upvotes',
  'Most Comments',
  'Least Comments',
];

const SortByButton = ({ currentCriteria, changeCriteria }) => {
  const [open, setOpen] = useState(false);

  const drop = useRef(null);

  const handleClick = (e) => {
    if (!e.target.closest(`.${drop.current.className}`) && open) setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div className="dropdown" ref={drop}>
      <DropDownButton
        onClick={() => {
          setOpen((open) => !open);
        }}
        currentCriteria={currentCriteria}
        isOpen={open}
      />
      {open && (
        <DropDownCard
          sortingCriteria={sortingCriteria}
          setOpen={setOpen}
          currentCriteria={currentCriteria}
          changeCriteria={changeCriteria}
        />
      )}
    </div>
  );
};

export default SortByButton;
