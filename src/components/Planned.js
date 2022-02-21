import SuggestionList from './SuggestionList';

const Planned = ({ plannedSuggestions }) => {
  return (
    <div className="planned container">
      <header className="roadmap-header">
        <h1>Planned ({plannedSuggestions.length})</h1>
        <p>Ideas prioritized for research</p>
      </header>
      <SuggestionList suggestions={plannedSuggestions} />
    </div>
  );
};

export default Planned;
