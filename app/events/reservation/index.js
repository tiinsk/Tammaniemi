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
        {name: "Recently Added", closable: false, to:"/reservations/recently-added"},
        {name: "Add new", closable: false, to: "/reservations/new"}
      ],
      tabIndex: 0
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentDidUpdate (prevProps) {
    console.log("componentDidUpdate");
    let oldId = prevProps.params.reservationId
    let newId = this.props.params.reservationId
    if (newId !== oldId && newId ){
      console.log("componentDidUpdate", " enter if");
      let tabs = this.state.tabItems;
      if (tabs.length > 2) {
        tabs.pop();
      }
      tabs.push({name: "Reservation", closable: false, to: "/reservations/" + newId});
      let index = tabs.length -1;
      console.log(index);
      this.setState({tabItems: tabs, tabIndex: index});
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

  selectTab(tabIndex){
    console.log(tabIndex);
    this.setState({
      tabIndex: tabIndex
    });
    console.log(this.state.tabItems[tabIndex].to);
    this.goTo(this.state.tabItems[tabIndex].to);
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

    let child;
    if (this.props.children) {
      child = (
        <Tab selected closable title="reservation">
          {this.props.children}
        </Tab>
      );
    };
    console.log("props:", this.props);

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
{/*            <Tabs>
              <Tab title="Recently Added">{reservationList}</Tab>
              <Tab title="Upcoming">dfghdfggfdfg</Tab>
              <Tab title="Add new">
                <ReservationForm reservations={this.state.reservations} reservation={this.state.reservation} onReservationSubmit={this.handleSubmit.bind(this)}/>
              </Tab>
              {child}
            </Tabs>*/}
            <Tabs2
              selected = {this.state.tabIndex}
              selectTab = {this.selectTab.bind(this)}
              items = {this.state.tabItems}
              closeItem = {this.selectTab.bind(this, 0)}
            />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
};


