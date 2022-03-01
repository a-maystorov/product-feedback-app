import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import RoadmapList from './components/RoadmapList';
import InProgress from './components/InProgress';
import SortByButton from './components/SortByButton';

import data from './data.json';
import Roadmap from './components/Roadmap';
import Home from './pages/Home/Home';
import SuggestionDetails from './pages/SuggestionDetails/SuggestionDetails';

import './App.css';
import CreateSuggestion from './pages/CreateSuggestion/CreateSuggestion';

const { productRequests } = data;
const { currentUser } = data;

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(productRequests);

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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                suggestionRequests={suggestions}
                plannedLength={planned.length}
                inProgressLength={inProgress.length}
                liveLength={live.length}
                menuOpen={menuOpen}
                handleMenuToggle={handleMenuToggle}
              />
            }
          />
          <Route
            path="/suggestion-details/:id/*"
            element={
              <SuggestionDetails
                suggestions={suggestions}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/create-suggestion"
            element={
              <CreateSuggestion
                suggestions={suggestions}
                setSuggestions={setSuggestions}
              />
            }
          />
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
