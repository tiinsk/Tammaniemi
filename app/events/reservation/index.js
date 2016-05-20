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
      },
      tabItems: [
        {name: "Recently Added", closable: false, path:"/reservations/recently-added"},
        {name: "Add new", closable: false, path: "/reservations/new"}
      ]
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.props);
    EventStore.listen(this.onChange);
    let id = this.props.params.reservationId;
    let tabs = this.state.tabItems;
    if (tabs.length > 2) {
      tabs.pop();
    }

    if (id){
      tabs.push({name: "Reservation", closable: true, path: "/reservations/" + id});
      this.setState({tabItems: tabs});
    }

  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps", nextProps, this.props);
    let oldId = this.props.params.reservationId;
    let newId = nextProps.params.reservationId;
    let tabs = this.state.tabItems;

    console.log("last route:", this.props.routes[this.props.routes.length-1]);

    if (tabs.length > 2){
      tabs.pop();
    }
    if(newId){
      tabs.push({name: "Reservation", closable: true, path: "/reservations/" + newId});
      this.setState({tabItems: tabs});
    }
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
    EventActions.create({
      type: 'reservations',
      content: reservation
    });
  }

  handleUpdate(reservationId){
    history.pushState(null, `/reservations/update/${reservationId}`);
  }

  goTo(link){
    console.log("linkki:" , link);
    history.pushState(null, link);
  }

  render() {

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
            <Tabs
              items = {this.state.tabItems}
              closeItem = {this.goTo.bind(this, '/reservations/recently-added')}
            />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
};


