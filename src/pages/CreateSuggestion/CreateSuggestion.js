import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import DropDownCategory from '../../components/DropDownCategory';

// Common components
import Button from '../../components/common/Button';
import BackButton from '../../components/common/BackButton';

// Styles
import './CreateSuggestion.css';

const categoryList = ['feature', 'UI', 'UX', 'enhancement', 'bug'];

const CreateSuggestion = ({ suggestions, setSuggestions }) => {
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState('feature');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      if (details === '') throw new Error("The input can't be empty...");
      if (details.length < 2) throw new Error('The input is too short...');
      if (title === '') throw new Error("The input can't be empty...");
      if (title.length < 2) throw new Error('The input is too short...');

      setSuggestions((prevSuggestions) => [
        ...prevSuggestions,
        addSuggestion(suggestionToAdd),
      ]);
      setDetails('');
      setTitle('');
      setError(null);
      setSuccess('The Feedback has been added!');
      setTimeout(() => navigate('/product-feedback-app/'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="edit-suggestion--container">
      <Link to="/product-feedback-app/" className="back-btn">
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
                categoryList={categoryList}
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
              </label>
            </div>
          </main>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
          <footer>
            <div className="save-btn">
              <Button bgColor={'purple'} content={'Add Feedback'} />
            </div>
            <Link
              to="/product-feedback-app/"
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
