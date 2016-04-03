import React from 'react';
import EventActions from '../event_actions';
import EventStore from '../event_store';
import ReservationForm from './form';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';


class UpdateReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: EventStore.getByType('reservations'),
      reservation: EventStore.getByTypeAndId('reservations', this.props.params.reservationId)
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState({
      reservation: EventStore.getByTypeAndId('reservations', this.props.params.reservationId)
    });
  }

  handleSubmit(data) {
    const content = this.state.reservation;
    content.title = data.title;
    content.startDate = data.startDate;
    content.endDate = data.endDate;

    EventActions.update({
      type: 'reservations',
      content
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

export default UpdateReservation;
