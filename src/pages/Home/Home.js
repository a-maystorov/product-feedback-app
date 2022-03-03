import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const { pathname } = useLocation();
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

        const repliesA = a.comments ? a.comments : [];
        const filteredRepliesA = repliesA.filter((comment) => {
          return comment.replies ? comment.replies : null;
        });

        const repliesB = b.comments ? b.comments : [];
        const filteredRepliesB = repliesB.filter((comment) => {
          return comment.replies ? comment.replies : null;
        });

        const repliesLengthA = filteredRepliesA[0]
          ? filteredRepliesA[0].replies.length
          : 0;

        const repliesLengthB = filteredRepliesB[0]
          ? filteredRepliesB[0].replies.length
          : 0;

        const A = commentsA + repliesLengthA;
        const B = commentsB + repliesLengthB;

        switch (currentSortCriteria) {
          case 'Most Upvotes':
            return b.upvotes - a.upvotes;
          case 'Least Upvotes':
            return a.upvotes - b.upvotes;
          case 'Most Comments':
            return B - A;
          case 'Least Comments':
            return A - B;
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
        handleMenuToggle={handleMenuToggle}
      />
      <header
        className={`Home__header ${
          menuOpen && pathname === '/' ? 'dark' : null
        }`}>
        <SortByButton
          currentSortCriteria={currentSortCriteria}
          changeSortCriteria={changeSortCriteria}
        />
        <Link
          to={'/create-suggestion'}
          className="Home__header__add-feedback--container">
          <Button bgColor={'purple'} content={'+ Add Feedback'} />
        </Link>
      </header>
      <main className={menuOpen && pathname === '/' ? 'dark' : null}>
        <SuggestionList
          suggestions={suggestions}
          menuOpen={menuOpen}
          handleMenuToggle={handleMenuToggle}
        />
      </main>
    </div>
  );
};

export default Home;
