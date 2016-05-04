import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import moment from 'moment';

import ReservationForm from './form';

import EventActions from '../event_actions';
import EventStore from '../event_store';
import Calendar from './calendar';

import history from '../../history';
import {Tabs, Tab} from '../../partials/tabs';
import Event from "../event_layout";

export default class IndexReservations extends React.Component {
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

  handleDelete(reservationId) {
    EventActions.delete({
      type: 'reservationa',
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
          <Event key={reservation._id} className="reservation" event={reservation} to={`/reservations/${reservation._id}`} addComment={this.handleAddComment} delete={this.handleDelete} update={this.handleUpdate}>{reservationContent}</Event>
      );
    });

    return (
      <div className='container'>
        <div className="page-title">
          Reservations
          <div className="add-new post" onClick={this.goTo.bind(this, "/reservations/new")}>
            <span>+</span>
          </div>
        </div>
        <div className="app-row-50">
          <div className="col-left" >
            <Calendar reservations={this.state.reservations}/>
          </div>
          <div className="col-right">
            <Tabs>
              <Tab title="Recently Added">{reservationList}</Tab>
              <Tab title="Upcoming">{reservationList}</Tab>
              <Tab title="Add new">
                <ReservationForm reservations={this.state.reservations} reservation={this.state.reservation} onReservationSubmit={this.handleSubmit.bind(this)}/>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
};


