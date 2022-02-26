import { useParams } from 'react-router-dom';

import Category from '../../components/common/Category';
import Upvote from '../../components/common/Upvote';
import Comments from '../../components/common/Comments';

import SuggestionComments from './SuggestionComments';
import { useEffect, useState } from 'react';

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

  console.log(replies); // This about this when adding new comment.

  return (
    <div className="container">
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
        setComments={setComments}
        setReplies={setReplies}
        currentUser={currentUser}
      />
    </div>
  );
};

export default SuggestionDetails;
