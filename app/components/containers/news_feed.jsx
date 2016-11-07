import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { fetchEvents } from '../../actions/event_actions';

import Task_S from '../../events/task/task_layout_s';
import Event from '../../events/event_layout';


class NewsFeed extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      itemsPerPage: 30,
      currentPage: 1
    }
  }

  componentWillMount(){
    this.props.fetchEvents('events', 'time');
  }

  getEndItem() {
    return this.state.currentPage * this.state.itemsPerPage;
  }

  changePage() {
    if ((this.state.currentPage + 1) * this.state.itemsPerPage < this.props.events.events.length) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  handleDelete() {
    return true;
  }

  handleUpdate() {
    return true;
  }

  render(){

    const markdown = {post: true, infopost: true};

    const events = this.props.events.events.slice(0, this.getEndItem()).map((event) => {
      const type = event.__t.toLowerCase();
      if (type === 'task') {
        return (
          <Task_S
            key={event._id}
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
          <Event
            key={event._id} className={type}
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
        <Event
          key={event._id} className={type}
          event={event}
          markdownContent={markdown[type]}
          secondarySymbol={event.category}
          to={`/${type}s/${event._id}`}
          delete={this.handleDelete}
          update={this.handleUpdate}
        >
          {event.content}
        </Event>
      );
    });

    return (
      <div>
        {events}
        <div className="show-more" onClick={this.changePage.bind(this)}>
          <span>Show more</span>
        </div>
      </div>
    );
  }

}

function mapStateToProps({events}) {
  return {
    events
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
