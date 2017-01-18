import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfoPostForm from '../presentational/event_forms/infopost_form.jsx';
import PostForm from '../presentational/event_forms/post_form.jsx';
import TaskForm from '../presentational/event_forms/task_form.jsx';
import ReservationForm from '../presentational/event_forms/reservation_form.jsx';
import { fetchOne, update } from '../../actions/event_actions';


class EventUpdate extends React.Component {
  constructor(props) {
    super(props);
    const {type, id} = this.props.params;
    this.props.fetchOne(type, id);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(updatedEvent) {
    this.props.update(updatedEvent);
  }

  render() {
    let form = null;
    const {type, id} = this.props.params;
    switch (type) {
      case 'posts':
        form = (
          <PostForm event={this.props.event} handleSubmit={this.handleSubmit} />
        );
        break;
      case 'infoposts':
        form = (
          <InfoPostForm event={this.props.event} handleSubmit={this.handleSubmit} />
        );
        break;
      case 'tasks':
        form = (
          <TaskForm event={this.props.event} handleSubmit={this.handleSubmit} />
        );
        break;
      case 'reservations':
        form = (
          <ReservationForm event={this.props.event} handleSubmit={this.handleSubmit} />
        );
        break;
      default:
        console.log('Incorrect type', type, id);
    }
    return (
      <div className="row center">
        <div className="create-main-only">
          {form}
        </div>
      </div>
    )
  }
}

function mapStateToProps({events: {event}}) {
  return {
    event
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOne, update }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventUpdate);
