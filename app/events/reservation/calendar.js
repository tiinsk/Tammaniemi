import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import _ from 'lodash';

export default class Calendar extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.currentMonth();
  }

  nextMonth(){
    this.setState({
      firstDayOfMonth: moment(this.state.firstDayOfMonth).add(1,'month')
    });
  }

  prevMonth(){
    this.setState({
      firstDayOfMonth: moment(this.state.firstDayOfMonth).subtract(1,'month')
    });
  }

  changeMonthAndYear(month, year){
    this.setState({
      firstDayOfMonth: moment(this.state.firstDayOfMonth).add(year, 'year').add(month,'month')
    });
  }

  currentMonth(){
    this.setState({
      firstDayOfMonth: moment().startOf('month')
    })
  }

  //return reservation if "date" is first day of reservation or first day of week
  getReservation(date){
    let reservation = this.props.reservations.find(reservation => {
      if (date.weekday()) { //other than first day of week
        return moment(reservation.startDate).isSame(date, 'day')
      }
      return moment(reservation.startDate).isSameOrBefore(date, 'day') &&moment(reservation.endDate).isSameOrAfter(date,'day')
    } )
    return reservation;
  }


  render(){
    let month = _.range(42).map((index) => {
      let day = moment(this.state.firstDayOfMonth).startOf('week').add(index, 'days');
      let reserved = this.getReservation(day);
      let reservedLink;
      if (reserved) {
        let resLength = moment(reserved.endDate).diff(day, 'days')+1;
        if (day.weekday()+resLength > 7) {
          resLength = 7-day.weekday();
        }
        reservedLink = (
          <Link style={{"width":resLength*100+"%"}} className="reserved-title" to={`/reservations/${reserved._id}`}>{reserved.title}</Link>
        );
      };
      return(
        <div key={day} className={"day " + (index % 7 == 0 ? "first" : "")}>
          <div className="container">
            <span className={"number " + (day.month() != moment(this.state.firstDayOfMonth).month() ? "diff-month ": "" )  }>
              {day.date().toString()}
            </span>
            {reservedLink}
          </div>

        </div>
      );
    });

    let weekdays = _.range(7).map((weekday) =>{
      return(
          <div key={weekday} className="weekday">
            {moment().day(weekday).format("dd")}
          </div>
        );
    });


    return(
      <div className={"calendar " +(this.props.small ? "small" : "")} >
        <div className="month">
          <div className="header">
              <div className="prev-year-btn cal-btn" onClick={this.changeMonthAndYear.bind(this, 0, -1)} ></div>
              <div className="prev-month-btn cal-btn" onClick={this.changeMonthAndYear.bind(this, -1, 0)} ></div>
              <div className="title">
                {moment(this.state.firstDayOfMonth).format("MMMM")} {moment(this.state.firstDayOfMonth).format("YYYY")}
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
