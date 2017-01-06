import React from 'react';
import moment from 'moment';
import Textfield from 'react-mdl/lib/Textfield';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchEvents } from '../../../actions/event_actions.js';
import translate from'../../../translate.jsx';

import DatePicker from '../date_picker.jsx';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    const reservation = {
      endDate: moment(),
      startDate: moment(),
      title: ''
    };

    this.state = {
      reservation: reservation,
      titleError: '',
      startDateError: '',
      endDateError: ''
    }
  }

  componentWillMount() {
    this.props.fetchEvents('Reservation');
  }

  updateTitle(event) {
    let reservation = this.state.reservation;
    reservation.title = event.target.value;
    this.setState({
      reservation: reservation,
      titleError: '',
    });
  }

  updateStartDate(event) {
    let reservation = this.state.reservation;
    reservation.startDate = event.target.value;
    this.setState({
      reservation: reservation,
      startDateError: '',
    });
  }
  updateEndDate(event) {
    let reservation = this.state.reservation;
    reservation.endDate = event.target.value;
    this.setState({
      reservation: reservation,
      endDateError: '',
    });
  }

  invalidData(reservation) {
    let titleError = reservation.title ? '' : 'Please enter title!';
    let startDateError = reservation.startDate ? '' : 'Please enter start date!';
    let endDateError = reservation.endDate ? '' : 'Please enter end date!';

    this.setState({
      titleError: titleError,
      startDateError: startDateError,
      endDateError: endDateError
    });

  }

  componentWillReceiveProps({event}) {
    if(event) {
      event.endDate = event.endDate ? moment(event.endDate) : undefined;
      event.startDate = event.startDate ? moment(event.startDate) : undefined;
      this.setState({reservation: event});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.reservation);
    if (this.state.reservation.title && this.state.reservation.startDate && this.state.reservation.endDate) {
      let reservation = this.state.reservation;
      reservation.endDate = reservation.endDate.toDate();
      reservation.startDate = reservation.startDate.toDate();
      reservation.__t = reservation.__t || 'Reservation';
      this.props.handleSubmit(reservation);
    }
    else {
      this.invalidData(this.state.reservation);
    }
  }

  selectDate(date) {

    let startDate = this.state.reservation.startDate;
    let endDate = this.state.reservation.endDate;

    if (startDate && startDate.isSame(endDate)) {
      if (startDate.isAfter(date)) {
        endDate = startDate;
        startDate = date;
      }
      else if (startDate.isSame(date)) {
        startDate = undefined;
        endDate = undefined;
      }
      else {
        endDate = date;
      }
    }
    else if (!startDate) {
      startDate = date;
      endDate = date;
    }
    else {
      startDate = undefined;
      endDate = undefined;
    }

    let alreadyReserved = this.props.reservations.some(oldRes => {
      return moment(oldRes.startDate).isAfter(startDate, 'day') && moment(oldRes.endDate).isBefore(endDate, 'day')
    });

    if (alreadyReserved) {
      return;
    }

    let reservation = this.state.reservation;
    reservation.startDate = startDate;
    reservation.endDate = endDate;
    this.setState({
      reservation
    });

  }

  render() {
    return (
      <div className='form reservation-form row center wrap-xs'>
        <div className="add-reservation-side xs-order-2">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <legend className="title">{this.props.strings.reservationForm.addReservation}</legend>
            <Textfield type="text"
              label={this.props.strings.events.title}
              required={true}
              value={this.state.reservation.title}
              onChange={this.updateTitle.bind(this)} />
            <span className='error-message'>{this.state.titleError}</span>

            <div className={"date " + (this.state.reservation.startDate ? "filled" : "")} >
              {this.state.reservation.startDate ? this.state.reservation.startDate.format("DD.MM.YYYY") : this.props.strings.reservationForm.startDate}
            </div>
            <span className='error-message'>{this.state.startDateError}</span>

            <div className={"date " + (this.state.reservation.endDate ? "filled" : "")}>
              {this.state.reservation.endDate ? this.state.reservation.endDate.format("DD.MM.YYYY") : this.props.strings.reservationForm.endDate}</div>
            <span className='error-message'>{this.state.endDateError}</span>

            <button type='submit' className='submit-btn'>{this.props.strings.events.submit}</button>
          </form>
        </div>
        <div className="add-reservation-side xs-order-1 min-width-300">
          <DatePicker
            reservations={this.props.reservations}
            startDate={this.state.reservation.startDate}
            endDate={this.state.reservation.endDate}
            selectDate={this.selectDate.bind(this)}
            />
        </div>
      </div>
    );
  }
};

function mapStateToProps({events}) {
  return {
    reservations: events.Reservation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(ReservationForm));
