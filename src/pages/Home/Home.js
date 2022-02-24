import { useState } from 'react';

// Components
import Button from '../../components/common/Button';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import SortByButton from '../../components/SortByButton';
import SuggestionList from '../../components/SuggestionList';

// Styles
import './Home.css';

const Home = ({
  suggestionRequests,
  plannedLength,
  inProgressLength,
  liveLength,
  menuOpen,
  handleMenuToggle,
}) => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentSortCriteria, setCurrentSortCriteria] =
    useState('Most Upvotes');

  const changeCategory = (newCategory) => setCurrentCategory(newCategory);
  const changeSortCriteria = (newCriteria) =>
    setCurrentSortCriteria(newCriteria);

  const sortedSuggestions = suggestionRequests
    ? suggestionRequests.sort((a, b) => {
        const commentsA = a.comments ? a.comments.length : 0;
        const commentsB = b.comments ? b.comments.length : 0;

        switch (currentSortCriteria) {
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

  return (
    <div className="Home">
      <nav>
        <NavBar onClick={handleMenuToggle} menuOpen={menuOpen} />
      </nav>
      <SideBar
        menuOpen={menuOpen}
        currentCategory={currentCategory}
        changeCategory={changeCategory}
        plannedLength={plannedLength}
        inProgressLength={inProgressLength}
        liveLength={liveLength}
      />
      <header className={`Home__header ${menuOpen ? 'dark' : null}`}>
        <SortByButton
          currentSortCriteria={currentSortCriteria}
          changeSortCriteria={changeSortCriteria}
        />
        <div className="Home__header__add-feedback--container">
          <Button bgColor={'purple'} content={'+ Add Feedback'} />
        </div>
      </header>
      <main className={menuOpen ? 'dark' : null}>
        <SuggestionList suggestions={suggestions} menuOpen={menuOpen} />
      </main>
    </div>
  );
};

export default Home;
