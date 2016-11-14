import React from 'react';

import Calendar from '../../events/reservation/calendar';
import NewsFeed from './news_feed.jsx';

export default () => {
  return (
    <div className="home">
      <div className="page-title">News feed</div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-7">
          <NewsFeed/>
        </div>
        <div className="calendar-container col-xs-3">
          <Calendar small />
        </div>
      </div>
    </div>
  );
};
