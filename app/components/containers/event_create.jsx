import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfoPostForm from '../presentational/event_forms/infopost_form.jsx';
import PostForm from '../presentational/event_forms/post_form.jsx';
import TaskForm from '../presentational/event_forms/task_form.jsx';
import ReservationForm from '../presentational/event_forms/reservation_form.jsx';
import { create } from '../../actions/event_actions';


class EventCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(newEvent) {
    this.props.create(newEvent);
  }

  render() {
    let form = null;
    const {type} = this.props.params;
    switch (type) {
      case 'posts':
        form = (
          <PostForm handleSubmit={this.handleSubmit} />
        );
        break;
      case 'infoposts':
        form = (
          <InfoPostForm handleSubmit={this.handleSubmit} />
        );
        break;
      case 'tasks':
        form = (
          <TaskForm handleSubmit={this.handleSubmit} />
        );
        break;
      case 'reservations':
        form = (
          <ReservationForm handleSubmit={this.handleSubmit} />
        );
        break;
      default:
        console.log('Incorrect type', type);
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

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ create }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
