import Button from './components/common/Button';
import Upvote from './components/common/Upvote';

const App = () => {
  return (
    <div className="container">
      <Upvote direction={'col'} upvotes={99} />
    </div>
  );
};

export default App;
