import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import _ from 'lodash';

class Calendar extends React.Component {

  // return reservation if "date" is first day of reservation or first day of week
  getReservation(date) {
    if (this.props.reservations && this.props.reservations.length) {
      return this.props.reservations.find(reservation => {
        if (date.weekday()) { // other than first day of week
          return moment(reservation.startDate).isSame(date, 'day');
        }
        return moment(reservation.startDate).isSameOrBefore(date, 'day') &&
          moment(reservation.endDate).isSameOrAfter(date, 'day');
      });
    }

    return null
  }


  render() {

    const month = _.range(42).map((index) => {
      const day = moment(this.props.firstDayOfMonth).startOf('week').add(index, 'days');
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
        <div key={index} className={`day ${(index % 7 === 0 ? 'first' : '')}`}>
          <div className="container">
            <span
              className={`number ${day.month() !== moment(this.props.firstDayOfMonth).month() ? 'diff-month ' : ''}`}>
              {day.date().toString()}
            </span>{reservedLink}
          </div>

        </div>
      );
    });

    const weekdays = _.range(7).map((weekday) => (
      <div key={weekday} className="weekday">
        {moment().weekday(weekday).format('dd')}
      </div>
    ));

    return (
      <div className={`calendar ${(this.props.small ? 'small' : '')}`}>
        <div className="month">
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

export default Calendar;
