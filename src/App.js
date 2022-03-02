import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import SuggestionDetails from './pages/SuggestionDetails/SuggestionDetails';
import CreateSuggestion from './pages/CreateSuggestion/CreateSuggestion';
import EditSuggestion from './pages/EditSuggestion/EditSuggestion';

// Components
import RoadmapList from './components/RoadmapList';

// Styles
import './App.css';

// Initial data
import data from './data.json';

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

  suggestions.forEach((suggestion) => {
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
            path="/edit-suggestion/:id/*"
            element={
              <EditSuggestion
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
