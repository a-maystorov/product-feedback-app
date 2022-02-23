import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import RoadmapList from './components/RoadmapList';
import InProgress from './components/InProgress';
import SortByButton from './components/SortByButton';

import data from './data.json';
import Roadmap from './components/Roadmap';
import Home from './pages/Home/Home';

import './App.css';

const { productRequests } = data;

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('overflowY-hidden');
  };

  const planned = [];
  const inProgress = [];
  const live = [];

  productRequests.forEach((suggestion) => {
    if (suggestion.status === 'planned') planned.push(suggestion);
    if (suggestion.status === 'in-progress') inProgress.push(suggestion);
    if (suggestion.status === 'live') live.push(suggestion);
  });

  return (
    <div className={`App ${menuOpen ? 'dark' : null}`}>
      <Home
        suggestionRequests={productRequests}
        plannedLength={planned.length}
        inProgressLength={inProgress.length}
        liveLength={live.length}
        menuOpen={menuOpen}
        handleMenuToggle={handleMenuToggle}
      />
      {/* <Roadmap
        plannedLength={planned.length}
        inProgressLength={inProgress.length}
        liveLength={live.length}
      /> */}
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
