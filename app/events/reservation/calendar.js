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
      <div className="calendar" >
        <div className="month">
          <div className="header">
              <div className="prev-month-btn" onClick={this.prevMonth.bind(this)} ></div>
              <div className="title">
                {moment(this.state.firstDayOfMonth).format("MMMM")} {moment(this.state.firstDayOfMonth).format("YYYY")}
              </div>
              <div className="next-month-btn" onClick={this.nextMonth.bind(this)} ></div>
            </div>
          <div className="weekdays">
            {weekdays}
          </div>
          {month}
        </div>
      </div>

    );
  }

}
