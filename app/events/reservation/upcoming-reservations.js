import React from 'react';
import moment from 'moment';

import EventStore from '../event_store';

import ListReservations from './list-reservations';

export default class UpcomingReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: EventStore.getByType('reservations'),
      itemsPerPage: 3,
      currentPage: 1
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

  render() {
    const reservationList = this.state.reservations
      .filter(reservation => moment(reservation.startDate).isAfter())
      .sort((a, b) => {
        const aMoment = moment(a.startDate);
        const bMoment = moment(b.startDate);

        if (aMoment.isSame(bMoment)) {
          return 0;
        }
        return aMoment.isAfter(bMoment) ? 1 : -1;
      });

    return (
      <div className="container">
        <ListReservations reservations={reservationList} />
      </div>
    );
  }
}
