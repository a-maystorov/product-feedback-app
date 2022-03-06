import { useEffect } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import BackButton from './common/BackButton';
import Button from './common/Button';

import InProgress from './InProgress';
import Live from './Live';
import Planned from './Planned';
import './RoadmapList.css';

const RoadmapList = ({ planned, inProgress, live, windowWidth }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    document.addEventListener('resize', function () {
      return windowWidth >= 768 ? navigate('/roadmap-list') : null;
    });
  });

  return (
    <div className={`roadmap-list ${windowWidth >= 768 ? 'container' : null}`}>
      <nav>
        <header className="roadmap-list__header">
          <div className="roadmap-list__header--back-btn">
            <Link to="/">
              <BackButton theme={'dark'} />
            </Link>
            <h1>Roadmap</h1>
          </div>
          <Link
            to={'/create-suggestion'}
            className="roadmap-list__header--add-btn">
            <Button bgColor={'purple'} content={'+ Add Feedback'} />
          </Link>
        </header>
        <footer
          className={windowWidth >= 768 ? 'd-none' : 'roadmap-list__footer'}>
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
          path={windowWidth < 768 ? 'planned' : 'roadmap-list'}
          element={<Planned plannedSuggestions={planned} />}
        />
        <Route
          path={windowWidth < 768 ? 'in-progress' : 'roadmap-list'}
          element={<InProgress inProgressSuggestions={inProgress} />}
        />
        <Route
          path={windowWidth < 768 ? 'live' : 'roadmap-list'}
          element={<Live liveSuggestions={live} />}
        />
      </Routes>

      {windowWidth >= 768 && (
        <div className="roadmap-list__suggestions">
          <Planned plannedSuggestions={planned} />
          <InProgress inProgressSuggestions={inProgress} />
          <Live liveSuggestions={live} />
        </div>
      )}
    </div>
  );
};

export default RoadmapList;
