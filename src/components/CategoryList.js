const categoryList = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature'];

const CategoryList = ({ currentCategory, changeCategory }) => {
  const handleClick = (newCategory) => changeCategory(newCategory);

  return (
    <div className="category-list">
      {categoryList.map((category) => (
        <button
          key={category}
          className={`category category--clickable ${
            currentCategory === category ? 'active' : null
          }`}
          onClick={() => handleClick(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
