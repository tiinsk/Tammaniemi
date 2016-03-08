import React from 'react';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: props.reservation,
      titleError: '',
      startDateError: '',
      endDateError: '',
      errorMessage: '',
      titleValidationState: '',
      startDateValidationState: '',
      endDateValidationState: '',
    }
  }

  updateTitle(event) {
    let reservation = this.state.reservation;
    reservation.title = event.target.value;
    this.setState({
      reservation: reservation,
      titleValidationState: '',
      titleError: '',
    });
  }

  updateStartDate(event) {
    let reservation = this.state.reservation;
    reservation.startDate = event.target.value;
    this.setState({
      reservation: reservation,
      startDateValidationState: '',
      startDateError: '',
    });
  }
  updateEndDate(event) {
    let reservation = this.state.reservation;
    reservation.endDate = event.target.value;
    this.setState({
      reservation: reservation,
      endDateValidationState: '',
      endDateError: '',
    });
  }

  invalidData(reservation) {
    let titleError = reservation.title ? '' : 'Please enter title!';
    let startDateError = reservation.startDate ? '' : 'Please enter start date!';
    let endDateError = reservation.endDate ? '' : 'Please enter end date!';

    let titleValidationState = reservation.title ? 'has-success' : 'has-error';
    let startDateValidationState = reservation.startDate ? 'has-success' : 'has-error';
    let endDateValidationState = reservation.endDate ? 'has-success' : 'has-error';

    this.setState({
      titleError: titleError,
      startDateError: startDateError,
      endDateError: endDateError,
      titleValidationState: titleValidationState,
      startDateValidationState: startDateValidationState,
      endDateValidationState: endDateValidationState
    });

  }

  componentWillReceiveProps (newProps) {
    this.setState(newProps.reservation);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.reservation);
    if (this.state.reservation.title && this.state.reservation.startDate && this.state.reservation.endDate) {
      this.props.onReservationSubmit(this.state.reservation);
    }
    else{
      this.invalidData(this.state.reservation);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Reservation</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.startDateValidationState}>
                    <label className='control-label'>Start Date</label>
                    <input type='text' className='form-control' value={this.state.reservation.startDate}
                           onChange={this.updateStartDate.bind(this)} autoFocus/>
                    <span className='help-block'>{this.state.startDateError}</span>
                  </div>
                  <div className={'form-group ' + this.state.endDateValidationState}>
                    <label className='control-label'>End Date</label>
                    <input type='text' className='form-control' value={this.state.reservation.endDate}
                           onChange={this.updateEndDate.bind(this)} autoFocus/>
                    <span className='help-block'>{this.state.endDateError}</span>
                  </div>

                  <div className={'form-group ' + this.state.titleValidationState}>
                    <label className='control-label'>Title</label>
                    <input type='text' className='form-control' value={this.state.reservation.title}
                           onChange={this.updateTitle.bind(this)} autoFocus/>
                    <span className='help-block'>{this.state.titleError}</span>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ReservationForm;
