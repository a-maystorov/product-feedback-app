import './Avatar.css';

const Avatar = ({ src, name, username }) => {
  return (
    <div className="avatar">
      <img src={src} alt="user avatar" />
      <div className="user-details">
        <h2>{name}</h2>
        <p>@{username}</p>
      </div>
    </div>
  );
};

export default Avatar;
