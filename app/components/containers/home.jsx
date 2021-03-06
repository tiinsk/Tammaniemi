import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { fetchEvents } from '../../actions/event_actions';

import Calendar from '../presentational/calendar.jsx';
import {SmallCalendarNavigator} from '../presentational/calendar_navigator.jsx';
import NewsFeed from '../presentational/news_feed.jsx';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMoment: moment({ year: moment().year(), month: moment().month() })
    };
    this.props.fetchEvents('events', 'time');
    this.props.fetchEvents('reservations');
  }

  updateTime(newMoment) {
    this.setState({
      selectedMoment: newMoment
    });
  }

  render() {
    return (
      <div className="home">
        <div className="row right">
          <div className="home-main">
            <NewsFeed data={this.props.events} />
          </div>
          <div className="home-side">
              <SmallCalendarNavigator
                selectedMoment={this.state.selectedMoment}
                changeMonthAndYear={(newMoment) => this.updateTime(newMoment)}
              />
              <Calendar
                small
                reservations={this.props.reservations}
                firstDayOfMonth={this.state.selectedMoment}
              />
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps({events}) {
  return {
    events,
    reservations: events.reservations
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
