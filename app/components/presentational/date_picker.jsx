import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import _ from 'lodash';

export default class DatePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstDayOfMonth: moment()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.firstDayOfMonth.isSame(nextState.firstDayOfMonth) ||
           nextProps.startDate !== this.props.startDate ||
           nextProps.endDate !== this.props.endDate ||
           nextProps.reservations !== this.props.reservations;
  }

  componentWillMount(){
    if (this.props.startDate && this.props.endDate) {
      this.currentMonth(this.props.startDate);
    }
    else{
      this.currentMonth(undefined);
    }
  }

  changeMonthAndYear(month, year){
    this.setState({
      firstDayOfMonth: moment(this.state.firstDayOfMonth).add(year, 'year').add(month,'month')
    });
  }

  currentMonth(month){
    this.setState({
      firstDayOfMonth: moment(month).startOf('month')
    })
  }

  getReservation(date){
    return this.props.reservations.some(reservation => {
      return moment(reservation.startDate).isSameOrBefore(date, 'day') &&moment(reservation.endDate).isSameOrAfter(date,'day')
    } );
  }
  getSelected(date){
    if(!this.props.endDate){
      return moment(this.props.startDate, "DD.MM.YYYY").isSame(date, 'day')
    }
    return moment(this.props.startDate, "DD.MM.YYYY").isSameOrBefore(date, 'day') && moment(this.props.endDate, "DD.MM.YYYY").isSameOrAfter(date,'day');
  }

  render(){
    let month = _.range(42).map((index) => {
      let day = moment(this.state.firstDayOfMonth).startOf('week').add(index, 'days');
      let reserved = this.getReservation(day);
      let selected = this.getSelected(day);

      let select;
      if (!reserved){
        select = this.props.selectDate.bind(this, day);
      }

      return(
        <div key={day} className={"day " + (reserved ? "reserved ": "") + (selected ? "selected ": "") + (index % 7 == 0 ? "first" : "")}>
          <div onClick={select} className="container">
            <span className={"number " + (day.month() != moment(this.state.firstDayOfMonth).month() ? "diff-month ": "" )  }>
              {day.date().toString()}
            </span>
          </div>

        </div>
      );
    });

    let weekdays = _.range(7).map((weekday) =>{
      return(
          <div key={weekday} className="weekday">
            {moment().weekday(weekday).format("dd")}
          </div>
        );
    });


    return(
      <div className="date-picker" >
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
          <div className="days">
            {month}
          </div>
        </div>
      </div>

    );
  }

}
