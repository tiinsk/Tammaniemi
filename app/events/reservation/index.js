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
    EventStore.listen(this.onChange);
    let id = this.props.params.reservationId;
    let tabs = this.state.tabItems;
    this.addTab(id, this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps){
    let newId = nextProps.params.reservationId;
    let location = nextProps.location.pathname;
    this.addTab(newId, location);
  }

  addTab(newId, location){
    if(newId){
      let tabs = this.state.tabItems;
      if(/\w+\/update\/.+/.test(location)){
        if (tabs.length > 2){
          tabs.pop();
        }
        tabs.push({name: "Update: reservation", closable: true, path: "/reservations/update/" + newId});
      }
      else{
        if (tabs.length > 2){
          tabs.pop();
        }
        tabs.push({name: "Reservation", closable: true, path: "/reservations/" + newId});
      }

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
    history.pushState(null, link);
  }

  closeTab(){
    this.state.tabItems.pop();
    this.goTo('/reservations/recently-added');
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
              closeItem = {() => this.closeTab()}
            />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
};


