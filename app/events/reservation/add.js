import React from 'react';
import ReservationForm from './form';
import ReservationActions from './reservation_actions';
import ReservationStore from './reservation_store';


class AddReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = ReservationStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    ReservationStore.listen(this.onChange);
    ReservationActions.setEmptyReservation();
  }

  componentWillUnmount() {
    ReservationStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(reservation){
    ReservationActions.addReservation(reservation, this.props.jwt);
  }

  render() {
    return (
      <ReservationForm reservation={this.state.reservation} onReservationSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

export default AddReservation;
