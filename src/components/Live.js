import SuggestionList from './SuggestionList';

const Live = ({ liveSuggestions }) => {
  return (
    <div className="live container">
      <header className="roadmap-header">
        <h1>Live ({liveSuggestions.length})</h1>
        <p>Released features</p>
      </header>
      <SuggestionList suggestions={liveSuggestions} />
    </div>
  );
};

export default Live;
