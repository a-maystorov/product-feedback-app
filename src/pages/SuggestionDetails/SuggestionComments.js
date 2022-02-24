import Avatar from '../../components/common/Avatar';

import './SuggestionComments.css';

const SuggestionComments = ({ comments }) => {
  const replies = [];

  comments.forEach((comment) => {
    if (comment.replies)
      comment.replies.forEach((reply) => replies.push(reply));
  });

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
            <button className="reply-btn">Reply</button>
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
                    <button className="reply-btn">Reply</button>
                  </header>
                  <main>
                    <p className="suggestion-comment__content">
                      <span className="replying-to">@{reply.replyingTo} </span>
                      {reply.content}
                    </p>
                  </main>
                </div>
              ))}
          </footer>
        </div>
      ))}
    </div>
  );
};

export default SuggestionComments;
