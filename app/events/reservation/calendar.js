import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';
import moment from 'moment';
import _ from 'lodash';

import { fetchEvents } from '../../actions/event_actions';

class Calendar extends React.Component {

  componentWillMount() {
    this.currentMonth();
    this.props.fetchEvents('reservations', 'time');
  }

  // return reservation if "date" is first day of reservation or first day of week
  getReservation(date) {
    const reservation = this.props.reservations.find(reservation => {
      if (date.weekday()) { // other than first day of week
        return moment(reservation.startDate).isSame(date, 'day');
      }
      return moment(reservation.startDate).isSameOrBefore(date, 'day') &&
             moment(reservation.endDate).isSameOrAfter(date, 'day');
    });
    return reservation;
  }

  changeMonthAndYear(month, year) {
    this.setState({
      firstDayOfMonth: moment(this.state.firstDayOfMonth).add(year, 'year').add(month, 'month')
    });
  }

  currentMonth() {
    this.setState({
      firstDayOfMonth: moment().startOf('month')
    });
  }

  render() {

    const month = _.range(42).map((index) => {
      const day = moment(this.state.firstDayOfMonth).startOf('week').add(index, 'days');
      const reserved = this.getReservation(day);
      let reservedLink;

      if (reserved) {
        let resLength = moment(reserved.endDate).diff(day, 'days') + 1;
        let padding = -10;

        if (day.weekday() + resLength > 7) {
          resLength = 7 - day.weekday();
          padding = resLength;
        }
        const leftMargin = moment(reserved.startDate).isSame(day, 'days') ? 10 : 0;
        const title = index === 0 || moment(reserved.startDate).isSame(day, 'days') ? reserved.title : '\u00a0';
        const name = index === 0 || moment(reserved.startDate).isSame(day, 'days') ? reserved.userId.name : '\u00a0';

        reservedLink = (
          <Link style={{
            width: `calc(${resLength * 100}% + ${padding}% - ${leftMargin}%)`,
            marginLeft: `${leftMargin}%`
          }}
            className="reserved-title"
            to={`/reservations/${reserved._id}`}
            title={name}
          >
            {title}
          </Link>
        );
      }

      return (
        <div key={day} className={`day ${(index % 7 === 0 ? 'first' : '')}`}>
          <div className="container">
            <span className={`number ${day.month() !== moment(this.state.firstDayOfMonth).month() ? 'diff-month ' : ''}`}>
              {day.date().toString()}
            </span>
            {reservedLink}
          </div>

        </div>
      );
    });

    const weekdays = _.range(7).map((weekday) => (
      <div key={weekday} className="weekday">
        {moment().day(weekday).format('dd')}
      </div>
    ));

    return (
      <div className={`calendar ${(this.props.small ? 'small' : '')}`} >
        <div className="month">
          <div className="header">
              <div className="prev-year-btn cal-btn" onClick={this.changeMonthAndYear.bind(this, 0, -1)} ></div>
              <div className="prev-month-btn cal-btn" onClick={this.changeMonthAndYear.bind(this, -1, 0)} ></div>
              <div className="title">
                {moment(this.state.firstDayOfMonth).format('MMMM')} {moment(this.state.firstDayOfMonth).format('YYYY')}
              </div>
              <div className="next-month-btn cal-btn" onClick={this.changeMonthAndYear.bind(this, 1, 0)} ></div>
              <div className="next-year-btn cal-btn" onClick={this.changeMonthAndYear.bind(this, 0, 1)} ></div>
            </div>
          <div className="weekdays">
            {weekdays}
          </div>
          <div className="day-container">
            {month}
          </div>
        </div>
      </div>

    );
  }

}

function mapStateToProps({events}) {
  return {
    reservations: events.reservations || []
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
