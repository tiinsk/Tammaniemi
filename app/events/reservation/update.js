import React from 'react';
import ReservationStore from './reservation_store';
import ReservationActions from './reservation_actions';
import ReservationForm from './form';

class UpdateReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = ReservationStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ReservationStore.listen(this.onChange);
    ReservationActions.getReservation(this.props.params.reservationId);
  }

  componentWillUnmount() {
    ReservationStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(data) {
    ReservationActions.updateReservation(this.props.params.reservationId, data.title, data.content, this.props.jwt);
  }

render() {
    return (
      <ReservationForm reservation={this.state.reservation} onReservationSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

export default UpdateReservation;
