import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CategoryList from '../../components/CategoryList';

// Components
import Button from '../../components/common/Button';
import NavBar from '../../components/NavBar';
import Roadmap from '../../components/Roadmap';
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
  windowWidth,
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
    <div className={`Home ${windowWidth >= 1366 ? 'container' : null}`}>
      <nav
        className={
          windowWidth >= 768 && windowWidth < 1366 ? 'container' : null
        }>
        <NavBar
          onClick={handleMenuToggle}
          menuOpen={menuOpen}
          windowWidth={windowWidth}
        />
        {windowWidth >= 768 && (
          <CategoryList
            currentCategory={currentCategory}
            changeCategory={changeCategory}
          />
        )}

        {windowWidth >= 768 && (
          <Roadmap
            plannedLength={plannedLength}
            inProgressLength={inProgressLength}
            liveLength={liveLength}
            windowWidth={windowWidth}
          />
        )}
      </nav>
      <SideBar
        menuOpen={menuOpen}
        currentCategory={currentCategory}
        changeCategory={changeCategory}
        plannedLength={plannedLength}
        inProgressLength={inProgressLength}
        liveLength={liveLength}
        handleMenuToggle={handleMenuToggle}
        windowWidth={windowWidth}
      />
      <div className={windowWidth >= 1366 ? 'desktop-container' : null}>
        <header
          className={`Home__header ${
            menuOpen &&
            (pathname === '/product-feedback-app/' ||
              pathname === '/product-feedback-app')
              ? 'dark'
              : null
          } ${windowWidth >= 768 ? 'container' : null}`}>
          {windowWidth >= 768 && (
            <div className="suggestions-status">
              <div className="icon-suggestions">
                <svg width="23" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.5 2.274c2.237 0 4.339.854 5.923 2.408a8.123 8.123 0 012.465 5.839 8.084 8.084 0 01-1.7 4.979 8.457 8.457 0 01-3.652 2.71l-.31.112.003.826h.369c.262 0 .475.21.475.469a.47.47 0 01-.39.46l-.085.008h-.365l.004 1.02h.36c.263 0 .476.21.476.469a.47.47 0 01-.39.461l-.085.008h-.358l.006 1.487a.466.466 0 01-.381.46l-.094.01H9.23a.478.478 0 01-.466-.378l-.01-.092.006-1.487h-.357a.472.472 0 01-.475-.47.47.47 0 01.39-.46l.085-.008h.361l.004-1.02h-.365a.472.472 0 01-.475-.468.47.47 0 01.39-.462l.085-.007h.368l.004-.826a8.452 8.452 0 01-3.996-2.867 8.08 8.08 0 01-1.666-5.056c.032-2.127.923-4.152 2.511-5.7 1.508-1.471 3.448-2.322 5.493-2.416l.324-.009h.06zm1.791 19.769H9.709l-.004 1.02h3.59l-.004-1.02zm-.007-1.958H9.716l-.003 1.02h3.574l-.003-1.02zM11.5 3.212h-.054c-3.946.027-7.327 3.325-7.384 7.2-.048 3.266 2.14 6.192 5.322 7.118.174.05.3.193.332.364l.008.088-.004 1.166h3.56l-.004-1.166a.47.47 0 01.34-.452c3.134-.912 5.323-3.794 5.323-7.01a7.197 7.197 0 00-2.185-5.173A7.453 7.453 0 0011.5 3.212zm.829 1.782a.4.4 0 01.401.397v.322c.48.12.932.307 1.346.552l.228-.226a.405.405 0 01.569 0L16.046 7.2a.393.393 0 010 .56l-.23.228c.247.41.437.858.557 1.333h.323a.4.4 0 01.402.397v1.645a.4.4 0 01-.402.396h-.323c-.12.476-.31.924-.557 1.333l.23.228a.393.393 0 010 .56l-1.173 1.163a.405.405 0 01-.57 0l-.227-.227a5.02 5.02 0 01-1.346.553v.322a.4.4 0 01-.401.396H10.67a.4.4 0 01-.402-.396v-.322a5.022 5.022 0 01-1.345-.553l-.228.227a.405.405 0 01-.569 0L6.954 13.88a.393.393 0 010-.56l.23-.228a4.924 4.924 0 01-.557-1.333h-.324a.4.4 0 01-.401-.396V9.719a.4.4 0 01.401-.397h.324c.12-.475.31-.923.557-1.333l-.23-.228a.393.393 0 010-.56L8.127 6.04a.405.405 0 01.569 0l.228.226a5.021 5.021 0 011.345-.552V5.39a.4.4 0 01.402-.397zM11.5 7.721c-1.572 0-2.846 1.263-2.846 2.82 0 1.558 1.274 2.82 2.846 2.82s2.846-1.262 2.846-2.82c0-1.557-1.274-2.82-2.846-2.82zm11.025 4.152c.262 0 .475.21.475.469a.47.47 0 01-.39.461l-.085.008h-.498a.472.472 0 01-.475-.469.47.47 0 01.39-.461l.085-.008h.498zm-21.552 0c.262 0 .475.21.475.469a.47.47 0 01-.39.461l-.085.008H.475A.472.472 0 010 12.342a.47.47 0 01.39-.461l.085-.008h.498zM3.112 3.45l.074.06.46.451c.185.183.186.48 0 .663a.476.476 0 01-.596.062l-.075-.06-.459-.451a.465.465 0 01-.001-.663.48.48 0 01.597-.062zm17.373.062c.162.16.182.408.06.59l-.061.073-.46.45a.476.476 0 01-.67 0 .464.464 0 01-.06-.59l.06-.074.46-.45a.48.48 0 01.671 0zM11.5 0c.233 0 .427.166.467.384l.008.085v.49a.472.472 0 01-.475.468.473.473 0 01-.467-.384l-.008-.084v-.49c0-.26.213-.469.475-.469z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
              <div className="number-of-suggestions">
                {suggestions.length}
                <h2>Suggestions</h2>
              </div>
            </div>
          )}
          <SortByButton
            currentSortCriteria={currentSortCriteria}
            changeSortCriteria={changeSortCriteria}
          />
          <Link
            to={'/product-feedback-app/create-suggestion'}
            className="Home__header__add-feedback--container">
            <Button bgColor={'purple'} content={'+ Add Feedback'} />
          </Link>
        </header>
        <main
          className={
            menuOpen &&
            (pathname === '/product-feedback-app/' ||
              pathname === '/product-feedback-app')
              ? 'dark'
              : null
          }>
          <SuggestionList
            suggestions={suggestions}
            menuOpen={menuOpen}
            handleMenuToggle={handleMenuToggle}
            windowWidth={windowWidth}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
