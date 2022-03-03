import { Link } from 'react-router-dom';

import Category from './common/Category';
import Comments from './common/Comments';
import Upvote from './common/Upvote';

import './SuggestionList.css';

const SuggestionList = ({ suggestions, menuOpen, handleMenuToggle }) => {
  return (
    <div className={`suggestion-list container ${menuOpen ? 'dark' : null}`}>
      {suggestions.length === 0 && <p>No suggestions yet!</p>}
      {suggestions.map((suggestion) => (
        <div className="suggestion-list__item" key={suggestion.id}>
          <header
            className="suggestion-list__header"
            onClick={handleMenuToggle}>
            <Link
              className="suggestion-details__link"
              to={`/suggestion-details/${suggestion.id}`}>
              <div className="status">
                <div className="status-dot"></div>
                {suggestion.status}
              </div>
              <h2>{suggestion.title}</h2>
              <p>{suggestion.description}</p>
              <Category category={suggestion.category} />
            </Link>
          </header>
          <footer className="suggestion-list__footer">
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
