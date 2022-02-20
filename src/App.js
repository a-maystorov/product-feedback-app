import CategoryList from './components/CategoryList';
import SuggestionList from './components/SuggestionList';
import { useState } from 'react';
import data from './data.json';

const { productRequests } = data;

const App = () => {
  const [currentCategory, setCurrentCategory] = useState('all');

  const changeCategory = (newCaregory) => setCurrentCategory(newCaregory);

  const suggestions = productRequests
    ? productRequests.filter((suggestion) => {
        switch (currentCategory) {
          case 'all':
            return true;
          case 'UI':
          case 'UX':
          case 'enhancement':
          case 'bug':
          case 'feature':
            return suggestion.category === currentCategory;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <CategoryList
        currentCategory={currentCategory}
        changeCategory={changeCategory}
      />
      <SuggestionList suggestions={suggestions} />
    </div>
  );
};

export default App;
