import moment from 'moment';
import React from 'react';

import EventStore from '../events/event_store';
import Event from '../events/event_layout';

import Calendar from '../events/reservation/calendar';
import Task from '../events/task/task_layout';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.sortEvents(EventStore.getByType('events')),
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
      events: this.sortEvents(state.events)
    });
  }

  sortEvents(events) {
    return events.sort((a, b) => {
      const aDate = moment(a.createdAt);
      const bDate = moment(b.createdAt);
      if (aDate.isAfter(bDate)) {
        return -1;
      }
      if (aDate.isBefore(bDate)) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
  }

  handleDelete() {
    return true;
  }

  handleUpdate() {
    return true;
  }

  getEndItem() {
    return this.state.currentPage * this.state.itemsPerPage;
  }

  changePage() {
    if ((this.state.currentPage + 1) * this.state.itemsPerPage < this.state.events.length) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  render() {
    const markdown = {post: true, infopost: true};

    const events = this.state.events.slice(0, this.getEndItem()).map((event) => {
      const type = event.__t.toLowerCase();
      if (type === 'task') {
        return (
          <Task key={event._id}
            task={event}
            to={`/tasks/${event._id}`}
            delete={this.handleDelete}
            update={this.handleUpdate}
          />
        );
      }
      if (type === 'reservation') {
        let reservationContent = (
          <div className="dates">
            <span className="start-date">{moment(event.startDate).format("DD.MM.YYYY")}</span>
            <span className="separator">-</span>
            <span className="end-date">{moment(event.endDate).format("DD.MM.YYYY")}</span>
          </div>
        );
        return (
          <Event key={event._id} className={type}
            event={event}
            markdownContent={markdown[type]}
            to={`/${type}s/${event._id}`}
            delete={this.handleDelete}
            update={this.handleUpdate}
          >
            {reservationContent}
          </Event>
        );
      }
      return (
        <Event key={event._id} className={type}
          event={event}
          markdownContent={markdown[type]}
          to={`/${type}s/${event._id}`}
          delete={this.handleDelete}
          update={this.handleUpdate}
        >
          {event.content}
        </Event>
      );
    });

    const reservations = this.state.events.filter(event => event.__t === 'Reservation');
    console.log(reservations);
    return (
      <div className="container">
        <div className="page-title">News feed</div>
        <div className="app-row">
          <div className="col-main-home">
            {events}
          </div>
          <div className="col-side">
            <Calendar small reservations={reservations} />
          </div>
        </div>

        <div className="show-more" onClick={this.changePage.bind(this)}>
          <span>Show more</span>
        </div>
      </div>
    );
  }
}

export default Home;
