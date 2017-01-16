import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EventForm from '../presentational/event_forms/event_form.jsx';
import ReservationForm from '../presentational/event_forms/reservation_form.jsx';
import {fetchOne, update} from '../../actions/event_actions';


const postForm = [
  {
    name: 'title',
    path: 'title',
    label: 'events.title',
    type: 'TextField'
  }, {
    name: 'content',
    path: 'content',
    label: 'events.content',
    type: 'TextEditor'
  }
]

const infoPostForm = [
  {
    name: 'title',
    path: 'title',
    label: 'events.title',
    type: 'TextField'
  }, {
    name: 'category',
    path: 'category',
    label: 'events.category',
    type: 'CategorySelect',
    initialValue: 1,
    categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    categoriesTranslation: 'infopostCategories'
  }, {
    name: 'content',
    path: 'content',
    label: 'events.content',
    type: 'TextEditor'
  }
]

const taskForm = [
  {
    name: 'title',
    path: 'title',
    label: 'events.title',
    type: 'TextField'
  }, {
    name: 'category',
    path: 'category',
    label: 'events.category',
    type: 'CategorySelect',
    initialValue: 1,
    categories: [0, 1, 2, 3, 4],
    categoriesTranslation: 'taskCategories'
  }
]


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
          <EventForm initialValue={this.props.event}
                     formFields={postForm}
                     handleSubmit={this.handleSubmit}
                     title={'postForm.addPost'}/>
        );
        break;
      case 'infoposts':
        form = (
          <EventForm initialValue={this.props.event}
                     formFields={infoPostForm}
                     handleSubmit={this.handleSubmit}
                     title={'infoPostForm.addInfoPost'}/>
        );
        break;
      case 'tasks':
        form = (
          <EventForm initialValue={this.props.event}
                     formFields={taskForm}
                     handleSubmit={this.handleSubmit}/>
        );
        break;
      case 'reservations':
        form = (
          <ReservationForm event={this.props.event} handleSubmit={this.handleSubmit}/>
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
  return bindActionCreators({fetchOne, update}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventUpdate);
