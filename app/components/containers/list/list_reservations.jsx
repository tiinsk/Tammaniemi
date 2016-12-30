import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment'

import { fetchEvents } from '../../../actions/event_actions.js';
import Calendar from '../../presentational/calendar.jsx';
import {CalendarNavigator} from '../../presentational/calendar_navigator.jsx';
import Event from '../event.jsx';
import LoadingAnimation  from '../../presentational/loading_animation.jsx';

class ReservationList extends React.Component {
  constructor(props) {
    super(props);

    let month = parseInt(this.props.params.year) || moment().month();
    let year = parseInt(this.props.params.month) || moment().year();

    this.state = {
      selectedMoment: moment({ year, month})
    };
  }

  componentWillMount() {
    this.props.fetchEvents('Reservation');
  }

  updateTime(newMoment) {
    this.setState({
      selectedMoment: newMoment
    });
  }

  filterReservations() {
    const nextMonth = this.state.selectedMoment.clone().add(1, 'months');
    return this.props.reservations.filter((reservation) =>
      moment(reservation.startDate).isBetween(this.state.selectedMoment, nextMonth) ||
      moment(reservation.endDate).isBetween(this.state.selectedMoment, nextMonth))
  }

  render() {

    if(this.props.loading) {
      return (
        <LoadingAnimation />
      )
    }

    let filteredReservations = this.filterReservations();

    return (
      <div className="list-reservations">
        <div className="row">
          <div className="col-xs-12 col-xs-offset-0 col-sm-offset-1 col-sm-10 col-md-offset-1 col-md-10">
            <CalendarNavigator
              selectedMoment={this.state.selectedMoment}
              changeMonthAndYear={(newMoment) => this.updateTime(newMoment) }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-xs-offset-0 col-sm-offset-1 col-sm-10 col-md-5 col-md-offset-1" >
            <Calendar reservations={this.props.reservations} firstDayOfMonth={this.state.selectedMoment.startOf('month')} />
          </div>
          <div className="col-xs-12 col-xs-offset-0 col-sm-offset-1 col-sm-10 col-md-offset-0 col-md-5 list">
            {
              filteredReservations.length ? filteredReservations.map((reservation) => (
              <Event key={reservation._id}
                event={reservation} />)) :
                <div className="no-reservations"> No reservations this month </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({events}) {
  return {
    loading: events.loading,
    reservations: events.Reservation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationList);
