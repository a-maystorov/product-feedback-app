import { useState } from 'react';
import { Link } from 'react-router-dom';
import DropDownCategory from '../../components/DropDownCategory';
import Button from '../../components/common/Button';
import './CreateSuggestion.css';
import BackButton from '../../components/common/BackButton';

const CreateSuggestion = ({ suggestions, setSuggestions }) => {
  const [currentCategory, setCurrentCategory] = useState('Feature');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null);

  const changeCategory = (newCategory) => setCurrentCategory(newCategory);

  const addSuggestion = (suggestionToAdd) => {
    suggestions.push(suggestionToAdd);
    return suggestionToAdd;
  };

  const handleSubmitSuggestion = (e) => {
    e.preventDefault();

    const suggestionToAdd = {
      id: Math.random(),
      title,
      category: currentCategory,
      description: details,
      status: 'suggestion',
      upvotes: 0,
    };

    try {
      if (details === '') throw new Error("Description can't be empty...");
      if (details.length < 2) throw new Error('Description is too short...');
      if (title === '') throw new Error("Title can't be empty...");
      if (title.length < 2) throw new Error('Title is too short...');

      setSuggestions((prevSuggestions) => [
        ...prevSuggestions,
        addSuggestion(suggestionToAdd),
      ]);
      setDetails('');
      setTitle('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <Link to="/" className="back-btn">
        <BackButton theme={'light'} />
      </Link>
      <div className="plus-icon">
        <span>+</span>
      </div>
      <div className="create-suggestion">
        <header>
          <h1>Create New Feedback</h1>
        </header>
        <form onSubmit={handleSubmitSuggestion}>
          <main>
            <div className="create-suggestion__title">
              <label>
                <h2>Feedback Title</h2>
                <p className="create-suggestion__title__description">
                  Add a short, descriptive headline
                </p>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                {error && <p className="error">{error}</p>}
              </label>
            </div>
            <div className="create-suggestion__category">
              <h2>Category</h2>
              <p className="create-suggestion__category__description">
                Choose a category for your feedback
              </p>
              <DropDownCategory
                currentCategory={currentCategory}
                changeCategory={changeCategory}
              />
            </div>
            <div className="create-suggestion__detail">
              <label>
                <h2>Feedback Detail</h2>
                <p className="create-suggestion__detail__description">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <textarea
                  onChange={(e) => setDetails(e.target.value)}
                  value={details}></textarea>
                {error && <p className="error">{error}</p>}
              </label>
            </div>
          </main>
          <footer>
            <Button bgColor={'purple'} content={'Add Feedback'} />
            <Link
              to="/"
              className="create-suggestion--cancel-btn"
              onClick={() => {
                setTitle('');
                setDetails('');
                setError(null);
              }}>
              Cancel
            </Link>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default CreateSuggestion;
