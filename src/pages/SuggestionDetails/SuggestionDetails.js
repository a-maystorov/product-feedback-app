import { useParams } from 'react-router-dom';

import Category from '../../components/common/Category';
import Upvote from '../../components/common/Upvote';
import Comments from '../../components/common/Comments';

import SuggestionComments from './SuggestionComments';

const SuggestionDetails = ({ suggestions }) => {
  const { id } = useParams();

  const getSuggestion = (id) => {
    return suggestions.filter((suggestion) =>
      suggestion.id === parseInt(id) ? suggestion : null
    );
  };

  const suggestion = getSuggestion(id);

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
      <SuggestionComments comments={suggestion[0].comments} />
    </div>
  );
};

export default SuggestionDetails;
