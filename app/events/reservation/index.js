import React from 'react';

import EventActions from '../event_actions';
import EventStore from '../event_store';
import Calendar from './calendar';

import history from '../../history';
import {Tabs} from '../../partials/tabs';

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
        {name: 'Upcoming', closable: false, path: '/reservations/upcoming'},
        {name: 'Recently Added', closable: false, path: '/reservations/recently-added'},
        {name: 'Add new', closable: false, path: '/reservations/new'}
      ]
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
    const id = this.props.params.reservationId;
    this.addTab(id, this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    const newId = nextProps.params.reservationId;
    const location = nextProps.location.pathname;
    this.addTab(newId, location);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      reservations: state.reservations
    });
  }

  addTab(newId, location) {
    if (newId) {
      const tabs = this.state.tabItems;
      if (/\w+\/update\/.+/.test(location)) {
        if (tabs.length > 3) {
          tabs.pop();
        }
        tabs.push({
          name: 'Update: reservation',
          closable: true,
          path: `/reservations/update/${newId}`
        });
      }
      else {
        if (tabs.length > 3) {
          tabs.pop();
        }
        tabs.push({
          name: 'Reservation',
          closable: true,
          path: `/reservations/${newId}`});
      }

      this.setState({tabItems: tabs});
    }
  }

  goTo(link) {
    history.pushState(null, link);
  }

  closeTab() {
    this.state.tabItems.pop();
    this.goTo('/reservations/recently-added');
  }

  render() {
    return (
      <div className="container reservations-index">
        <div className="page-title">
          Reservations
          <div className="add-new post" onClick={this.goTo.bind(this, '/reservations/new')}>
            <span>+</span>
          </div>
        </div>
        <div className="app-row-50">
          <div className="col-left" >
            <Calendar reservations={this.state.reservations} />
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
}
