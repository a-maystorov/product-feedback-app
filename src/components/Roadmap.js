import { Link } from 'react-router-dom';
import './Roadmap.css';

const Roadmap = ({ plannedLength, inProgressLength, liveLength }) => {
  return (
    <div className="roadmap">
      <header>
        <h1 className="roadmap__header">Roadmap</h1>
        <span className="view-btn">View</span>
      </header>
      <footer>
        <div className="suggestion planned-suggestions">
          <div className="suggestion__status">
            <div className="dot"></div>
            <p>Planned</p>
          </div>
          <span>{plannedLength}</span>
        </div>
        <div className="suggestion in-progress-suggestions">
          <div className="suggestion__status ">
            <div className="dot"></div>
            <p>In-Progress</p>
          </div>
          <span>{inProgressLength}</span>
        </div>
        <div className="suggestion live-suggestions">
          <div className="suggestion__status">
            <div className="dot"></div>
            <p>Live</p>
          </div>
          <span>{liveLength}</span>
        </div>
      </footer>
    </div>
  );
};

export default Roadmap;
