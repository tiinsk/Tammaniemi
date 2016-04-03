import React from 'react';
import ReservationForm from './form';
import EventActions from '../event_actions';
import EventStore from '../event_store';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class AddReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: EventStore.getByType('reservations'),
      reservation: {
        startDate: undefined,
        endDate: undefined
      }
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      reservations: state.reservations
    });
  }

  handleSubmit(reservation){
    console.log("handleSubmit");
    EventActions.create({
      type: 'reservations',
      content: reservation
    });
  }

  render() {
    return (
      <Row>
        <Col md="6" md-offset="3" >
          <ReservationForm reservations={this.state.reservations} reservation={this.state.reservation} onReservationSubmit={this.handleSubmit.bind(this)}/>
        </Col>
      </Row>
    );
  }
}

export default AddReservation;
