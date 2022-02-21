import CategoryList from './components/CategoryList';
import SuggestionList from './components/SuggestionList';
import { useState } from 'react';
import data from './data.json';
import RoadmapList from './components/RoadmapList';
import InProgress from './components/InProgress';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';

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
      {/* <CategoryList
        currentCategory={currentCategory}
        changeCategory={changeCategory}
      />
      <SuggestionList suggestions={suggestions} /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/roadmap-list/*"
            element={<RoadmapList data={productRequests} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
