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

const SuggestionDetails = ({ suggestions, currentUser }) => {
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState(() => {
    const currentSuggestion = suggestions.filter((suggestion) =>
      suggestion.id === parseInt(id) ? suggestion : null
    );
    return currentSuggestion;
  });
  const [comments, setComments] = useState(suggestion[0].comments);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const suggestionReplies = comments.map((comment) => {
      if (!comment.replies) comment.replies = [];
      return comment.replies;
    });
    setReplies(suggestionReplies.flat(1));
  }, [comments]);

  return (
    <div className="container">
      <nav className="suggestion-details__nav">
        <Link to="/">
          <BackButton theme={'light'} />
        </Link>
        <div className="nav-btn--container">
          <Button bgColor={'blue'} content={'Edit Feedback'} />
        </div>
      </nav>
      <div className="suggestion-list__item">
        <header className="suggestion-list__header">
          <h2>{suggestion[0].title}</h2>
          <p>{suggestion[0].description}</p>
          <Category category={suggestion[0].category} />
        </header>
        <footer className="suggestion-list__footer">
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
  );
};

export default SuggestionDetails;
