import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment'

import { fetchEvents } from '../../../actions/event_actions.js';
import Calendar from '../../presentational/calendar.jsx';
import Event from '../event.jsx';

class ReservationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMoment: moment({ year: parseInt(this.props.params.year), month: parseInt(this.props.params.month) })
    };
    this.updateTime = this.updateTime.bind(this);
    this.filterReservations = this.filterReservations.bind(this);
  }

  componentWillReceiveProps(newProps) {
    let year = this.state.selectedMoment[0] || moment().year();
    let month = this.state.selectedMoment[1] || moment().month();
    this.setState({
      selectedMoment: moment({ year: year, month: month })
    });
  }

  componentWillMount() {
    this.props.fetchEvents('Reservation');
  }

  updateTime(newTimeRange) {
    this.setState({
      selectedMoment: newTimeRange.clone()
    });
  }

  filterReservations() {
    const nextMonth = this.state.selectedMoment.clone().add(1, 'months');
    return this.props.reservations.filter((reservation) =>
      moment(reservation.startDate).isBetween(this.state.selectedMoment, nextMonth) ||
      moment(reservation.endDate).isBetween(this.state.selectedMoment, nextMonth))
  }

  render() {
    return (
      <div className="reservations-index">
        <div className="page-title">
          Reservations
          <div className="add-new post" >
            <span>+</span>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-5 col-xs-offset-1" >
            <Calendar reservations={this.props.reservations} onTimeRangeChange={this.updateTime} />
          </div>
          <div className="col-xs-5">
            {this.filterReservations().map((reservation) => (
              <Event key={reservation._id}
                event={reservation} />))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({events}) {
  return {
    reservations: events.Reservation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationList);
