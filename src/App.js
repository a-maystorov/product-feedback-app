import Button from './components/common/Button';

const App = () => {
  return (
    <div className="container">
      <div className="btn-container">
        <Button bgColor={'red'} content={'Post'} />
        <Button bgColor={'purple'} content={'+ Add Request'} />
        <Button bgColor={'gray'} content={'Edit'} />
        <Button bgColor={'blue'} content={'Rename'} />
      </div>
    </div>
  );
};

export default App;
