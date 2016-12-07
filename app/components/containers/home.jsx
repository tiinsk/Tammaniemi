import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { fetchEvents } from '../../actions/event_actions';

import Event from './event.jsx';
import Calendar from '../presentational/calendar.jsx';
import {SmallCalendarNavigator} from '../presentational/calendar_navigator.jsx';
import NewsFeed from '../presentational/news_feed.jsx';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMoment: moment({ year: moment().year(), month: moment().month() })
    };
  }

  componentWillMount() {
    this.props.fetchEvents('events', 'time');
    this.props.fetchEvents('Reservation');

  }

  updateTime(newMoment) {
    this.setState({
      selectedMoment: newMoment
    });
  }

  render() {
    return (
      <div className="home">
        <div className="page-title">News feed</div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-7">
            <NewsFeed events={this.props.events} />
          </div>
          <div className="calendar-container col-xs-3">
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
    reservations: events.Reservation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
