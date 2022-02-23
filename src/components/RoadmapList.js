import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import BackButton from './common/BackButton';
import Button from './common/Button';

import InProgress from './InProgress';
import Live from './Live';
import Planned from './Planned';
import './RoadmapList.css';

const RoadmapList = ({ planned, inProgress, live }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <div className="roadmap-list">
      <nav>
        <header className="roadmap-list__header">
          <div className="roadmap-list__header--back-btn">
            <BackButton theme={'dark'} />
            <h1>Roadmap</h1>
          </div>
          <div className="roadmap-list__header--add-btn">
            <Button bgColor={'purple'} content={'+ Add Feedback'} />
          </div>
        </header>
        <footer className="roadmap-list__footer ">
          <button
            onClick={() => navigate('/roadmap-list/planned')}
            className={
              pathname === '/roadmap-list/planned' ? 'planned-selected' : null
            }>
            Planned ({planned.length})
          </button>
          <button
            onClick={() => navigate('/roadmap-list/in-progress')}
            className={
              pathname === '/roadmap-list/in-progress'
                ? 'in-progress-selected'
                : null
            }>
            In-Progress ({inProgress.length})
          </button>
          <button
            onClick={() => navigate('/roadmap-list/live')}
            className={
              pathname === '/roadmap-list/live' ? 'live-selected' : null
            }>
            Live ({live.length})
          </button>
        </footer>
      </nav>
      <Routes>
        <Route
          path="planned"
          element={<Planned plannedSuggestions={planned} />}
        />
        <Route
          path="in-progress"
          element={<InProgress inProgressSuggestions={inProgress} />}
        />
        <Route path="live" element={<Live liveSuggestions={live} />} />
      </Routes>
    </div>
  );
};

export default RoadmapList;
