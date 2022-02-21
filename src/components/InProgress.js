import SuggestionList from './SuggestionList';

const InProgress = ({ inProgressSuggestions }) => {
  return (
    <div className="in-progress container">
      <header className="roadmap-header">
        <h1>In-Progress ({inProgressSuggestions.length})</h1>
        <p>Currently being developed</p>
      </header>
      <SuggestionList suggestions={inProgressSuggestions} />
    </div>
  );
};

export default InProgress;
