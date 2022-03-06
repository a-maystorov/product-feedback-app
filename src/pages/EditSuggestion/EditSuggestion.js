import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Components
import DropDownCategory from '../../components/DropDownCategory';

// Common components
import Button from '../../components/common/Button';
import BackButton from '../../components/common/BackButton';

// Styles
import './EditSuggestion.css';

const statusList = ['planned', 'in-progress', 'live'];
const categoryList = ['feature', 'UI', 'UX', 'enhancement', 'bug'];

const EditSuggestion = ({ suggestions, setSuggestions, windowWidth }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const suggestion =
    suggestions &&
    suggestions.find((suggestion) =>
      suggestion.id === parseFloat(id) ? suggestion : null
    );

  const [currentSuggestion, setCurrentSuggestion] = useState(suggestion);
  const [currentCategory, setCurrentCategory] = useState(
    currentSuggestion.category
  );
  const [currentStatus, setCurrentStatus] = useState(currentSuggestion.status);
  const [newTitle, setNewTitle] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [success, setSuccess] = useState(null);
  const [deleteSucess, setDeleteSucess] = useState(null);

  const changeCategory = (newCategory) => setCurrentCategory(newCategory);

  const changeStatus = (newStatus) => setCurrentStatus(newStatus);

  const handleDelete = () => {
    const newSuggestions = suggestions.filter(
      (suggestion) => suggestion.id !== parseFloat(id)
    );

    setTimeout(() => navigate('/product-feedback-app/'), 2000);

    setSuggestions(newSuggestions);
    setDeleteSucess('Feedback has been deleted!');
  };

  const handleSubmitSuggestion = (e) => {
    e.preventDefault();

    try {
      setCurrentSuggestion((prevState) => {
        let suggestion = prevState;
        suggestion.title = newTitle || suggestion.title;
        suggestion.category = currentCategory;
        suggestion.status = currentStatus;
        suggestion.description = newDetails || suggestion.description;
        return suggestion;
      });

      setTimeout(() => navigate('/product-feedback-app/'), 2000);
      setSuccess('The Feedback has been updated!');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="edit-suggestion--container">
      <Link
        to={`/product-feedback-app/suggestion-details/${id}`}
        className="back-btn">
        <BackButton theme={'light'} />
      </Link>
      <div className="edit-icon">
        <svg
          width={windowWidth >= 768 ? '56' : '40'}
          height={windowWidth >= 768 ? '56' : '40'}
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient
              cx="103.9%"
              cy="-10.387%"
              fx="103.9%"
              fy="-10.387%"
              r="166.816%"
              id="a">
              <stop stopColor="#E84D70" offset="0%" />
              <stop stopColor="#A337F6" offset="53.089%" />
              <stop stopColor="#28A7ED" offset="100%" />
            </radialGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <circle fill="url(#a)" cx="20" cy="20" r="20" />
            <path
              d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
              fill="#FFF"
              fillRule="nonzero"
            />
          </g>
        </svg>
      </div>
      <div className="create-suggestion">
        <header>
          <h1>{`Editing '${currentSuggestion.title}'`}</h1>
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
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={currentSuggestion.title}
                  value={newTitle}
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
            <div className="create-suggestion__category">
              <h2>Update Status</h2>
              <p className="create-suggestion__category__description">
                Change feature state
              </p>
              <DropDownCategory
                currentCategory={currentStatus}
                changeCategory={changeStatus}
                categoryList={statusList}
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
                  onChange={(e) => setNewDetails(e.target.value)}
                  placeholder={currentSuggestion.description}
                  value={newDetails}></textarea>
              </label>
            </div>
          </main>
          {success && <p className="success">{success}</p>}
          {deleteSucess && <p className="success">{deleteSucess}</p>}
          <footer>
            <div className="save-btn">
              <Button bgColor={'purple'} content={'Save Changes'} />
            </div>
            <Link
              to={`/product-feedback-app/suggestion-details/${id}`}
              className="create-suggestion--cancel-btn"
              onClick={() => {
                setNewTitle('');
                setNewDetails('');
              }}>
              Cancel
            </Link>
            <div
              className="create-suggestion--delete-btn"
              onClick={handleDelete}>
              Delete
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EditSuggestion;
