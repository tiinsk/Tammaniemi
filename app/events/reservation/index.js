import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import ReservationStore from './reservation_store';
import ReservationActions from './reservation_actions';
import Calendar from './calendar';

import history from '../../history';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Event from "../event_layout";

class IndexReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = ReservationStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ReservationStore.listen(this.onChange);
    ReservationActions.getReservations(this.props.params);
  }

  componentWillUnmount() {
    ReservationStore.unlisten(this.onChange);
  }

  handleDelete(reservationId){
    ReservationActions.deleteReservation(reservationId, this.props.jwt);
  }

  handleUpdate(reservationId){
    history.pushState(null, '/reservations/update/'+ reservationId );
  }

  handleAddComment(comment) {
    ReservationActions.addComment(comment);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let reservationList = this.state.reservations.map((reservation, index) => {
      return (
          <Event key={reservation._id} className="reservation" event={reservation} to={`/reservations/${reservation._id}`} addComment={this.handleAddComment} delete={this.handleDelete} update={this.handleUpdate}>{reservation.startDate}-{reservation.endDate}</Event>
      );
    });

    return (
      <div className='container'>
        <Row>
          <Col md="6" md-offset="3" >
            <Calendar reservations={this.state.reservations}/>
            {reservationList}
          </Col>
        </Row>
      </div>
    );
  }
}

export default IndexReservations;
