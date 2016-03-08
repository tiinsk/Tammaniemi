import React from 'react';
import ReservationStore from './reservation_store';
import ReservationActions from './reservation_actions';
import {Link} from 'react-router';
import _ from 'underscore';


import history from '../../history';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Event from "../event_layout";


class ShowReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    ReservationStore.listen(this.onChange);
    ReservationActions.getReservation(this.props.params.reservationId);
  }

   componentWillUnmount() {
    ReservationStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
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

  render() {
    let reservationData;
    if(this.state.reservation) {
      if (!this.state.reservation._id) {
        reservationData = (
          <div className="alert alert-danger" role="alert">Reservation not found!</div>
          );
      }
      else{
        reservationData = (

          <Event className="reservation" event={this.state.reservation}addComment={this.handleAddComment}  delete={this.handleDelete} update={this.handleUpdate}>{this.state.reservation.startDate}-{this.state.reservation.endDate}</Event>
        )
      }
    }

    return (
      <div className='container'>
        <Row>
          <Col md="6" md-offset="3" >
            {reservationData}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ShowReservation;

