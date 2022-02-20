import { useState } from 'react';
import './Category.css';

const Category = ({ category }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => setIsActive(!isActive);

  return (
    <button
      className={`category ${isActive ? 'active' : null}`}
      onClick={handleToggle}>
      {category}
    </button>
  );
};

export default Category;
