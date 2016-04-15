import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import moment from 'moment';
import Button from 'muicss/lib/react/button';

import EventActions from '../event_actions';
import EventStore from '../event_store';
import Calendar from './calendar';

import history from '../../history';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Event from "../event_layout";

class IndexReservations extends React.Component {
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
      type: 'reservationa',
      id: reservationId
    });
  }

  handleUpdate(reservationId){
    history.pushState(null, `/reservations/update/${reservationId}`);
  }

  render() {
    let reservationList = this.state.reservations.map((reservation, index) => {
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
        <Row>
          <Col md="6" md-offset="3" >
            <Button>
              <Link to="/reservations/new">New</Link>
            </Button>
            <Calendar reservations={this.state.reservations}/>
            {reservationList}
          </Col>
        </Row>
      </div>
    );
  }
}

export default IndexReservations;
