import { useState, useRef } from 'react';

// Components
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';

// Styles
import './SuggestionComments.css';

const SuggestionComments = ({
  suggestionComments,
  suggestionReplies,
  setReplies,
  currentUser,
}) => {
  const [toggleReply, setToggleReply] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [error, setError] = useState(null);

  const textAreaRef = useRef(null);

  function scrollToTextArea() {
    if (!textAreaRef.current) return;
    textAreaRef.current.scrollIntoView();
  }

  const getCurrentCommentId = (id) => setCurrentCommentId(id);

  const getReplyingTo = (user) => setReplyingTo(user);

  const handleReplyToggle = () => {
    setToggleReply(!toggleReply);
    setError(null);
  };

  const addReply = (replyToAdd) => {
    const currentComment = suggestionComments.filter(
      (comment) => comment.id === currentCommentId
    );

    currentComment[0].replies.push(replyToAdd);

    return replyToAdd;
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    const replyToAdd = {
      content: newReply,
      replyingTo,
      user: {
        image: currentUser.image,
        name: currentUser.name,
        username: currentUser.username,
      },
    };

    try {
      if (newReply === '') throw new Error("Reply can't be empty...");
      if (newReply.length < 2) throw new Error('Reply is too short...');

      setReplies((prevReplies) => [...prevReplies, addReply(replyToAdd)]);
      setToggleReply(false);
      setNewReply('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="suggestion-comments">
      <h1>
        <span>
          {suggestionComments
            ? suggestionComments.length + suggestionReplies.length
            : 0}
        </span>
        <span>Comments</span>
      </h1>
      {suggestionComments &&
        suggestionComments.map((comment) => (
          <div
            className={`suggestion-comment ${
              !comment.replies || comment.replies.length === 0
                ? 'no-reply'
                : null
            }`}
            key={comment.id}>
            <header className="suggestion-comment__header">
              <Avatar
                src={comment.user.image}
                name={comment.user.name}
                username={comment.user.username}
              />
              <button
                className="reply-btn"
                onClick={() => {
                  handleReplyToggle();
                  scrollToTextArea();
                  getCurrentCommentId(comment.id);
                  getReplyingTo(comment.user.username);
                }}>
                Reply
              </button>
            </header>
            <main>
              <p className="suggestion-comment__content">{comment.content}</p>
            </main>
            <footer className="comment-replies">
              {comment.replies &&
                comment.replies.map((reply, index) => (
                  <div className="comment-reply" key={index}>
                    <header className="comment-reply__header">
                      <Avatar
                        src={reply.user.image}
                        name={reply.user.name}
                        username={reply.user.username}
                      />
                      <button
                        className="reply-btn"
                        onClick={() => {
                          getCurrentCommentId(comment.id);
                          handleReplyToggle();
                          getReplyingTo(reply.user.username);
                          scrollToTextArea();
                        }}>
                        Reply
                      </button>
                    </header>
                    <main>
                      <p className="suggestion-comment__content">
                        <span className="replying-to">
                          @{reply.replyingTo}{' '}
                        </span>
                        {reply.content}
                      </p>
                    </main>
                  </div>
                ))}
              {toggleReply && currentCommentId === comment.id && (
                <form
                  className={`add-reply ${error ? 'error-outline' : null}`}
                  onSubmit={handleSubmitReply}
                  ref={textAreaRef}>
                  <label>
                    <textarea
                      autoFocus
                      placeholder={`Reply to @${replyingTo}...`}
                      onChange={(e) => setNewReply(e.target.value)}
                      value={newReply}></textarea>
                    {error && <p className="error">{error}</p>}
                  </label>
                  <div className="post-reply--container">
                    <Button bgColor={'purple'} content={'Post Reply'} />
                    <div
                      className="cancel-btn"
                      onClick={() => {
                        handleReplyToggle();
                        setNewReply('');
                      }}>
                      Cancel
                    </div>
                  </div>
                </form>
              )}
            </footer>
          </div>
        ))}
    </div>
  );
};

export default SuggestionComments;
