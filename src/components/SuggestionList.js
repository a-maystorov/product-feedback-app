import Category from './common/Category';
import Comments from './common/Comments';
import Upvote from './common/Upvote';

import './SuggestionList.css';

const SuggestionList = ({ suggestions }) => {
  return (
    <div className="suggestion-list container">
      {suggestions.length === 0 && <p>No suggestions yet!</p>}
      {suggestions.map((suggestion) => (
        <div className="suggestion-list__item" key={suggestion.id}>
          <header className="suggestion-list__header">
            <div className="status">
              <div className="status-dot"></div>
              {suggestion.status}
            </div>
            <h2>{suggestion.title}</h2>
            <p>{suggestion.description}</p>
            <Category category={suggestion.category} />
          </header>
          <footer className="suggestion-list__footer">
            <Upvote direction={'row'} upvotes={suggestion.upvotes} />
            <Comments
              commentsAmount={
                !suggestion.comments ? 0 : suggestion.comments.length
              }
            />
          </footer>
        </div>
      ))}
    </div>
  );
};

export default SuggestionList;
