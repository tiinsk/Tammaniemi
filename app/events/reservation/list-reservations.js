import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';

import EventActions from '../event_actions';
import Event from '../../components/containers/event.jsx';

import Pagination from '../../navigation/pagination';

class ListReservations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 3,
      currentPage: 1
    };
  }

  getStartItem() {
    return this.state.itemsPerPage * (this.state.currentPage - 1);
  }

  getEndItem() {
    return this.getStartItem() + this.state.itemsPerPage;
  }

  changePage(nextPage) {
    if (nextPage > 0 && nextPage <= Math.ceil(this.props.reservations.length / this.state.itemsPerPage)) {
      this.setState({
        currentPage: nextPage
      });
    }
  }

  handleDelete(reservationId) {
    this.setState({currentPage: 1});
    EventActions.delete({
      type: 'reservations',
      id: reservationId
    });
  }

  handleUpdate(reservationId) {
    this.props.router.push(`/reservations/update/${reservationId}`);
  }

  goTo(link) {
    this.props.router.push(link);
  }

  render() {
    const reservationList = this.props.reservations
    .slice(this.getStartItem(), this.getEndItem())
    .map((reservation, index) => {
      const reservationContent = (
        <div className="dates">
          <span className="start-date">{moment(reservation.startDate).format('DD.MM.YYYY')}</span>
          <span className="separator">-</span>
          <span className="end-date">{moment(reservation.endDate).format('DD.MM.YYYY')}</span>
        </div>
      );
      return (
        <Event key={index} className="reservation"
          event={reservation}
          to={`/reservations/${reservation._id}`}
          addComment={this.handleAddComment}
          delete={this.handleDelete.bind(this)}
          update={this.handleUpdate.bind(this)}
        >{reservationContent}</Event>
      );
    });

    return (
      <div className="container">
        {reservationList}
        <Pagination amount={this.props.reservations.length}
          itemsPerPage={this.state.itemsPerPage}
          currentPage={this.state.currentPage}
          changePage={this.changePage.bind(this)}
        />
      </div>
    );
  }
}

export default withRouter(ListReservations);
