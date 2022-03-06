import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Components
import SuggestionComments from './SuggestionComments';
import CreateComment from './CreateComment';

// Common components
import Button from '../../components/common/Button';
import BackButton from '../../components/common/BackButton';
import Category from '../../components/common/Category';
import Upvote from '../../components/common/Upvote';
import Comments from '../../components/common/Comments';

// Styles
import './SuggestionDetails.css';

const SuggestionDetails = ({ suggestions, currentUser, windowWidth }) => {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState(() => {
    const currentSuggestion =
      suggestions &&
      suggestions.filter((suggestion) =>
        suggestion.id === parseFloat(id) ? suggestion : null
      );
    return currentSuggestion;
  });

  useEffect(() => {
    const suggestionReplies =
      comments &&
      comments.map((comment) => {
        if (!comment.replies) comment.replies = [];
        return comment.replies;
      });

    suggestionReplies && setReplies(suggestionReplies.flat(1));
    suggestion[0].comments && setComments(suggestion[0].comments);
  }, [comments, suggestion]);

  return (
    <div
      className={
        windowWidth < 1366 ? 'container' : 'suggestion-details--container'
      }>
      <div className={windowWidth >= 768 ? 'suggestion-details' : null}>
        <nav className="suggestion-details__nav">
          <Link to="/">
            <BackButton theme={'light'} />
          </Link>
          <Link
            to={`/edit-suggestion/${suggestion[0].id}`}
            className="nav-btn--container">
            <Button bgColor={'blue'} content={'Edit Feedback'} />
          </Link>
        </nav>
        <div className="suggestion-list__item">
          <div
            className={
              windowWidth >= 768 ? 'suggestion-list__tablet-plus' : null
            }>
            {windowWidth >= 768 && (
              <div className="suggestion-list__tablet-plus__upvotes">
                <Upvote direction={'col'} upvotes={suggestion[0].upvotes} />
              </div>
            )}
            <header className="suggestion-list__header">
              <h2>{suggestion[0].title}</h2>
              <p>{suggestion[0].description}</p>
              <Category category={suggestion[0].category} />
            </header>
            {windowWidth >= 768 && <Comments comments={comments} />}
          </div>
          <footer
            className={`suggestion-list__footer ${
              windowWidth >= 768 ? 'd-none' : null
            }`}>
            <Upvote direction={'row'} upvotes={suggestion[0].upvotes} />
            <Comments comments={comments} />
          </footer>
        </div>
        <SuggestionComments
          suggestionComments={comments}
          suggestionReplies={replies}
          setReplies={setReplies}
          currentUser={currentUser}
        />
        <CreateComment
          currentUser={currentUser}
          currentSuggestion={suggestion}
          setComments={setComments}
        />
      </div>
    </div>
  );
};

export default SuggestionDetails;
