import React from 'react';
import EventStore from '../event_store';
import EventActions from '../event_actions';
import moment from 'moment';
import {Link} from 'react-router';
import _ from 'underscore';

import history from '../../history';

import Event from "../event_layout";


class ShowReservation extends React.Component {
  constructor(props) {
    console.log("ShowReservation");
    super(props);
    this.state = {
      reservation: EventStore.getByTypeAndId('reservations', this.props.params.reservationId)
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  componentDidUpdate (prevProps) {
    // respond to parameter change in scenario 3
    let oldId = prevProps.params.reservationId
    let newId = this.props.params.reservationId
    if (newId !== oldId)
      this.update();
  }

  onChange() {
    this.update();
  }

  update(){
    this.setState({
      reservation: EventStore.getByTypeAndId('reservations', this.props.params.reservationId)
    });
  }

  handleDelete(reservationId) {
    EventActions.delete({
      type: 'reservations',
      id: reservationId
    });
    history.pushState(null, '/reservations');
  }


  handleUpdate(reservationId){
    history.pushState(null, '/reservations/update/'+ reservationId );
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
        let reservationContent = (
          <div className="dates">
            <span className="start-date">{moment(this.state.reservation.startDate).format("DD.MM.YYYY")}</span>
            <span className="separator">-</span>
            <span className="end-date">{moment(this.state.reservation.endDate).format("DD.MM.YYYY")}</span>
          </div>
        );
        reservationData = (
          <Event className="reservation" event={this.state.reservation}  delete={this.handleDelete} update={this.handleUpdate}>{reservationContent}</Event>
        )
      }
    }

    return (
      <div className='container'>
        {reservationData}
      </div>
    );
  }
}

export default ShowReservation;

