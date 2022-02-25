import { useState, useRef } from 'react';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';

import './SuggestionComments.css';

const SuggestionComments = ({
  suggestionComments,
  suggestionReplies,
  currentUser,
}) => {
  const [comments, setComments] = useState(suggestionComments);
  const [replies, setReplies] = useState(suggestionReplies);
  const [newReply, setNewReply] = useState('');
  const [toggleReply, setToggleReply] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  const textAreaRef = useRef(null);

  function scrollToTextArea() {
    if (!textAreaRef.current) return;
    textAreaRef.current.scrollIntoView();
  }

  const getCurrentCommentId = (id) => setCurrentCommentId(id);

  const getReplyingTo = (user) => setReplyingTo(user);

  const handleReplyToggle = () => setToggleReply(!toggleReply);

  const addReply = (comments, replyToAdd) => {
    comments.forEach((comment) => {
      if (!comment.replies) comment.replies = [];
      if (comment.id === currentCommentId) comment.replies.push(replyToAdd);
    });
    return comments;
  };

  const handlePostReply = (e) => {
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

    const newComments = addReply(comments, replyToAdd);

    setReplies((prevReplies) => [...prevReplies, newComments.replies]);
    setToggleReply(false);
    setNewReply('');
  };

  // console.log(comments);
  // console.log(replies);

  return (
    <div className="suggestion-comments">
      <h1>{comments.length + replies.length} Comments</h1>
      {comments.map((comment) => (
        <div
          className={`suggestion-comment ${
            !comment.replies ? 'no-reply' : null
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
                getCurrentCommentId(comment.id);
                handleReplyToggle();
                getReplyingTo(comment.user.username);
                scrollToTextArea();
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
                      <span className="replying-to">@{reply.replyingTo} </span>
                      {reply.content}
                    </p>
                  </main>
                </div>
              ))}
            {toggleReply && currentCommentId === comment.id && (
              <form
                className="add-reply"
                onSubmit={handlePostReply}
                ref={textAreaRef}>
                <label>
                  <textarea
                    required
                    autoFocus
                    placeholder="Add a reply..."
                    onChange={(e) => setNewReply(e.target.value)}
                    value={newReply}></textarea>
                </label>
                <div className="post-reply--container">
                  <Button bgColor={'purple'} content={'Post Reply'} />
                  <div className="cancel-btn" onClick={handleReplyToggle}>
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
