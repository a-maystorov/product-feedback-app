import './Button.css';

const Button = ({ bgColor, content }) => {
  return <button className={`btn bg-${bgColor}`}>{content}</button>;
};

export default Button;
