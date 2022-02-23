import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import SuggestionList from './components/SuggestionList';
import RoadmapList from './components/RoadmapList';
import InProgress from './components/InProgress';
import SortByButton from './components/SortByButton';

import data from './data.json';
import Roadmap from './components/Roadmap';

const { productRequests } = data;

const App = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentCriteria, setCurrentCriteria] = useState('Most Upvotes');

  const changeCategory = (newCategory) => setCurrentCategory(newCategory);
  const changeCriteria = (newCriteria) => setCurrentCriteria(newCriteria);

  const sortedSuggestions = productRequests
    ? productRequests.sort((a, b) => {
        const commentsA = a.comments ? a.comments.length : 0;
        const commentsB = b.comments ? b.comments.length : 0;

        switch (currentCriteria) {
          case 'Most Upvotes':
            return b.upvotes - a.upvotes;
          case 'Least Upvotes':
            return a.upvotes - b.upvotes;
          case 'Most Comments':
            return commentsB - commentsA;
          case 'Least Comments':
            return commentsA - commentsB;
          default:
            return b.upvotes - a.upvotes;
        }
      })
    : null;

  const suggestions = sortedSuggestions
    ? sortedSuggestions.filter((suggestion) => {
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

  const planned = [];
  const inProgress = [];
  const live = [];

  productRequests.forEach((suggestion) => {
    if (suggestion.status === 'planned') planned.push(suggestion);
    if (suggestion.status === 'in-progress') inProgress.push(suggestion);
    if (suggestion.status === 'live') live.push(suggestion);
  });

  return (
    <div>
      <Roadmap
        plannedLength={planned.length}
        inProgressLength={inProgress.length}
        liveLength={live.length}
      />
      {/* <SortByButton
        currentCriteria={currentCriteria}
        changeCriteria={changeCriteria}
      /> */}
      {/* <CategoryList
        currentCategory={currentCategory}
        changeCategory={changeCategory}
      /> */}
      {/* <SuggestionList suggestions={suggestions} /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/roadmap-list/*"
            element={
              <RoadmapList
                planned={planned}
                inProgress={inProgress}
                live={live}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
