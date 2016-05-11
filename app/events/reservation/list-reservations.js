import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import moment from 'moment';

import ReservationForm from './form';

import EventActions from '../event_actions';
import EventStore from '../event_store';
import Calendar from './calendar';

import history from '../../history';
import {Tabs2, Tab} from '../../partials/tabs';
import Event from "../event_layout";

export default class ListReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: EventStore.getByType('reservations')
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

  handleDelete(reservationId) {
    EventActions.delete({
      type: 'reservations',
      id: reservationId
    });
  }

  handleSubmit(reservation){
    console.log("handleSubmit");
    EventActions.create({
      type: 'reservations',
      content: reservation
    });
  }

  handleUpdate(reservationId){
    history.pushState(null, `/reservations/update/${reservationId}`);
  }

  goTo(link){
    history.pushState(null, link);
  }

  render() {
    let reservationList = this.state.reservations.filter(reservation => moment(reservation.endDate).isAfter(moment()) ).map((reservation, index) => {
      let reservationContent = (
        <div className="dates">
          <span className="start-date">{moment(reservation.startDate).format("DD.MM.YYYY")}</span>
          <span className="separator">-</span>
          <span className="end-date">{moment(reservation.endDate).format("DD.MM.YYYY")}</span>
        </div>
      );
      return (
          <Event key={index} className="reservation" event={reservation} to={`/reservations/${reservation._id}`} addComment={this.handleAddComment} delete={this.handleDelete} update={this.handleUpdate}>{reservationContent}</Event>
      );
    });


    return (
      <div className='container'>
        {reservationList}
      </div>
    );
  }
};

