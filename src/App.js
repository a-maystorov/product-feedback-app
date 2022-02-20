import SuggestionList from './components/SuggestionList';

import data from './data.json';
// console.log(data.productRequests);

const App = () => {
  return (
    <div>
      <SuggestionList suggestions={data.productRequests} />
    </div>
  );
};

export default App;
