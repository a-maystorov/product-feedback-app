import './DropDownCard.css';

const DropDownCard = ({
  sortingCriteria = [],
  currentSortCriteria,
  changeSortCriteria,
  setOpen,
}) => {
  const handleClick = (newCriteria) => changeSortCriteria(newCriteria);

  return (
    <div className="dd-criteria-list">
      <ul className="criteria-list">
        {sortingCriteria.map((criteria) => (
          <li
            key={criteria}
            className={`criteria ${
              currentSortCriteria === criteria ? 'current-criteria' : null
            }`}
            onClick={() => {
              handleClick(criteria);
              setOpen(false);
            }}>
            {criteria}
            <span className="tick">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
                <path
                  fill="none"
                  stroke="#AD1FEA"
                  strokeWidth="2"
                  d="M1 5.233L4.522 9 12 1"
                />
              </svg>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownCard;
