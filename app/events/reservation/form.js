import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import moment from 'moment';

import DatePicker from './date_picker';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    let reservation = props.reservation;
    reservation.endDate = props.reservation.endDate ? moment(reservation.endDate) : undefined;
    reservation.startDate = props.reservation.startDate ? moment(reservation.startDate) : undefined;

    this.state = {
      reservation: reservation,
      titleError: '',
      startDateError: '',
      endDateError: ''
    }
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

  componentWillReceiveProps (newProps) {
    let reservation = newProps.reservation;
    reservation.endDate = reservation.endDate ? moment(reservation.endDate) : undefined;
    reservation.startDate = reservation.startDate ? moment(reservation.startDate) : undefined;
    this.setState(reservation);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.reservation);
    if (this.state.reservation.title && this.state.reservation.startDate && this.state.reservation.endDate) {
      let reservation = this.state.reservation;
      reservation.endDate = reservation.endDate.toDate();
      reservation.startDate = reservation.startDate.toDate();
      this.props.onReservationSubmit(reservation);
    }
    else{
      this.invalidData(this.state.reservation);
    }
  }

  selectDate(date){

    let startDate = this.state.reservation.startDate;
    let endDate = this.state.reservation.endDate;

    if(startDate && startDate.isSame(endDate)){
      if(startDate.isAfter(date)){
        endDate = startDate;
        startDate = date;
      }
      else if(startDate.isSame(date)){
        startDate = undefined;
        endDate = undefined;
      }
      else{
        endDate = date;
      }
    }
    else if (!startDate){
      startDate = date;
      endDate = date;
    }
    else{
      startDate = undefined;
      endDate = undefined;
    }

    let alreadyReserved = this.props.reservations.some(oldRes => {
      return moment(oldRes.startDate).isAfter(startDate, 'day') && moment(oldRes.endDate).isBefore(endDate,'day')
    } );

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
      <div className='form reservation-form'>
        <Row>
          <Col md="6">
              <Form onSubmit={this.handleSubmit.bind(this)}>

                <legend className="title">Add new reservation</legend>

                <Input type='text' label="Title" floatingLabel={true} required={true} value={this.state.reservation.title}
                         onChange={this.updateTitle.bind(this)} autoFocus/>
                <span className='error-message'>{this.state.titleError}</span>

{/*                <div className="form-item">

                  <input className="form-input" value={this.state.reservation.title} onChange={(event)=> this.updateTitle(event)} />
                  <label className="legend">Title</label>
                </div>*/}


                <div className={"date " +(this.state.reservation.startDate ? "filled" : "")} >{this.state.reservation.startDate ? this.state.reservation.startDate.format("DD.MM.YYYY") : "Start Date"}
                </div>
                <span className='error-message'>{this.state.startDateError}</span>

                <div className={"date " +(this.state.reservation.endDate ? "filled" : "")}>{this.state.reservation.endDate ? this.state.reservation.endDate.format("DD.MM.YYYY") : "End Date"}</div>
                <span className='error-message'>{this.state.endDateError}</span>

                <button type='submit' className='submit-btn'>Submit</button>
              </Form>
          </Col>
          <Col md="6">
            <DatePicker
              reservations={this.props.reservations}
              startDate={this.state.reservation.startDate}
              endDate={this.state.reservation.endDate}
              selectDate={this.selectDate.bind(this)}
            />
          </Col>
        </Row>
      </div>
    );
  }
};

export default ReservationForm;
