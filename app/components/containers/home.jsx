import moment from 'moment';
import React from 'react';

import EventStore from '../../events/event_store';
import Calendar from '../../events/reservation/calendar';
import NewsFeed from './news_feed.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.sortEvents(EventStore.getByType('events'))
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      events: this.sortEvents(state.events)
    });
  }

  sortEvents(events) {
    return events.sort((a, b) => {
      const aDate = moment(a.createdAt);
      const bDate = moment(b.createdAt);
      if (aDate.isAfter(bDate)) {
        return -1;
      }
      if (aDate.isBefore(bDate)) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
  }


  changePage() {
    if ((this.state.currentPage + 1) * this.state.itemsPerPage < this.state.events.length) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  render() {

    const reservations = this.state.events.filter(event => event.__t === 'Reservation');
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
}

export default Home;
