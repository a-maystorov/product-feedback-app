import { useState, useRef, useEffect } from 'react';
import DropDownButton from './common/DropDownButton';
import DropDownCard from './common/DropDownCard';

const DropDownCategory = ({
  currentCategory,
  changeCategory,
  categoryList,
}) => {
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
        currentSortCriteria={currentCategory}
        isOpen={open}
      />
      {open && (
        <DropDownCard
          sortingCriteria={categoryList}
          setOpen={setOpen}
          currentSortCriteria={currentCategory}
          changeSortCriteria={changeCategory}
        />
      )}
    </div>
  );
};

export default DropDownCategory;
