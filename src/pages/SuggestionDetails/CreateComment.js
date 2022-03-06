import { useState } from 'react';
import Button from '../../components/common/Button';
import './CreateComment.css';

const CreateComment = ({ currentUser, currentSuggestion, setComments }) => {
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [charCount, setCharCount] = useState(250);

  const addComment = (commentToAdd) => {
    if (!currentSuggestion.comments) currentSuggestion.comments = [];
    currentSuggestion.comments.push(commentToAdd);

    return commentToAdd;
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const commentToAdd = {
      content: newComment,
      id: Math.random(),
      replies: [],
      user: {
        image: currentUser.image,
        name: currentUser.name,
        username: currentUser.username,
      },
    };

    try {
      if (newComment === '') throw new Error("Comment can't be empty...");
      if (newComment.length < 2) throw new Error('Comment is too short...');

      setComments(
        (prevComments) =>
          prevComments && [...prevComments, addComment(commentToAdd)]
      );
      setNewComment('');
      setCharCount(250);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="create-comment ">
        <h1>Add Comment</h1>
        <form
          className={`add-comment ${error ? 'error-outline' : null}`}
          onSubmit={handleSubmitComment}>
          <label>
            <textarea
              placeholder="Type your comment here..."
              onChange={(e) => {
                setNewComment(e.target.value);
                setCharCount((prevCount) => prevCount - 1);
                e.target.addEventListener('keydown', function (event) {
                  if (event.code === 'Backspace' && charCount < 250)
                    setCharCount(charCount + 1);
                  if (charCount > 250) setCharCount(250);
                });
              }}
              value={newComment}></textarea>
            {error && <p className="error">{error}</p>}
          </label>
          <div className="form-footer">
            <div className="post-comment--container">
              <Button bgColor={'purple'} content={'Post Comment'} />
            </div>
            <p>{charCount} Characters left</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
