import React from 'react';

import Calendar from '../../events/reservation/calendar';
import NewsFeed from './news_feed.jsx';

export default () => {
  return (
    <div className="container">
      <div className="page-title">News feed</div>
      <div className="app-row">
        <div className="col-main-home">
          <NewsFeed/>
        </div>
        <div className="col-side">
          <Calendar small />
        </div>
      </div>
    </div>
  );
}
