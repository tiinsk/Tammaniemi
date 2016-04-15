import moment from 'moment';
import React from 'react';

import EventStore from '../events/event_store';
import Event from '../events/event_layout';

import Task from '../events/task/task_layout';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.sortEvents(EventStore.getByType('events'))
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

  render() {
    const markdown = {"post": true, "infopost": true};
    const events = this.state.events.map((event) => {
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
      if(type === 'reservation'){
        let reservationContent = (
          <div className="dates">
            <span className="start-date">{moment(event.startDate).format("DD.MM.YYYY")}</span>
            <span className="separator">-</span>
            <span className="end-date">{moment(event.endDate).format("DD.MM.YYYY")}</span>
          </div>
        );
        return(
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

    return (
      <div className="container">
        <div className="page-title">News feed</div>
        <Row>
          <Col md="8" md-offset="2">
            {events}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
