import { useParams } from 'react-router-dom';

import Category from '../../components/common/Category';
import Upvote from '../../components/common/Upvote';
import Comments from '../../components/common/Comments';

import SuggestionComments from './SuggestionComments';
import { useEffect, useState } from 'react';

const SuggestionDetails = ({ suggestions, currentUser }) => {
  const { id } = useParams();
  const replies = [];

  const getSuggestion = (id) => {
    return suggestions.filter((suggestion) =>
      suggestion.id === parseInt(id) ? suggestion : null
    );
  };

  const suggestion = getSuggestion(id);

  suggestion[0].comments.forEach((comment) => {
    if (comment.replies)
      comment.replies.forEach((reply) => replies.push(reply));
  });

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
          <Comments comments={suggestion[0].comments} />
        </footer>
      </div>
      <SuggestionComments
        suggestionComments={suggestion[0].comments}
        suggestionReplies={replies}
        currentUser={currentUser}
      />
    </div>
  );
};

export default SuggestionDetails;
