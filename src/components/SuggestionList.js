import { Link, useLocation } from 'react-router-dom';

import Category from './common/Category';
import Comments from './common/Comments';
import Upvote from './common/Upvote';

import NoSuggestionsYet from './NoSuggestionsYet';

import './SuggestionList.css';

const SuggestionList = ({
  suggestions,
  menuOpen,
  handleMenuToggle,
  windowWidth,
}) => {
  const { pathname } = useLocation();

  return (
    <div className={`suggestion-list container ${menuOpen ? 'dark' : null}`}>
      {suggestions.length === 0 && <NoSuggestionsYet />}
      {suggestions.map((suggestion) => (
        <div
          className={`suggestion-list__item ${
            pathname === '/product-feedback-app/roadmap-list' ||
            pathname === '/product-feedback-app/roadmap-list/planned' ||
            pathname === '/product-feedback-app/roadmap-list/in-progress' ||
            pathname === '/product-feedback-app/roadmap-list/live'
              ? 'suggestion-roadmap'
              : null
          }`}
          key={suggestion.id}>
          <header
            className="suggestion-list__header"
            onClick={() => {
              windowWidth < 768 && menuOpen && handleMenuToggle();
            }}>
            <div
              className={
                windowWidth >= 768 ? 'suggestion-list__tablet-plus' : null
              }>
              {windowWidth >= 768 && (
                <div className="suggestion-list__tablet-plus__upvotes">
                  <Upvote direction={'col'} upvotes={suggestion.upvotes} />
                </div>
              )}
              <Link
                className="suggestion-details__link"
                to={`/product-feedback-app/suggestion-details/${suggestion.id}`}>
                <div className="status">
                  <div className="status-dot"></div>
                  {suggestion.status}
                </div>
                <h2>{suggestion.title}</h2>
                <p>{suggestion.description}</p>
                <Category category={suggestion.category} />
              </Link>
              {windowWidth >= 768 && (
                <Comments
                  comments={suggestion.comments ? suggestion.comments : []}
                />
              )}
            </div>
          </header>
          <footer
            className={`suggestion-list__footer ${
              windowWidth >= 768 &&
              (pathname === '/product-feedback-app/' ||
                pathname === '/product-feedback-app')
                ? 'd-none'
                : null
            }`}>
            <Upvote direction={'row'} upvotes={suggestion.upvotes} />
            <Comments
              comments={suggestion.comments ? suggestion.comments : []}
            />
          </footer>
        </div>
      ))}
    </div>
  );
};

export default SuggestionList;
