import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EventForm from '../presentational/event_forms/event_form.jsx';
import ReservationForm from '../presentational/event_forms/reservation_form.jsx';
import GalleryForm from '../presentational/event_forms/gallery_form.jsx';
import {create, createPhotoset} from '../../actions/event_actions';

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

class EventCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: undefined
    };

    this.handlePhotoSetSubmit = this.handlePhotoSetSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const {type} = this.props.params;
    this.setState({
      event: JSON.parse(localStorage.getItem(type)),
      lastEditTime: 0
    });
  }

  handleSubmit(newEvent, type) {
    newEvent.__t = type;
    this.props.create(newEvent)
      .then(() => {
        localStorage.removeItem(`${type.toLowerCase()}s`);
      })
      .catch(() => {/*do nothing*/
      });
  };

  handlePhotoSetSubmit(photoset) {
    this.props.createPhotoset(photoset);
  };

  render() {
    let form = null;
    const {type} = this.props.params;
    switch (type) {
      case 'posts':
        form = (
          <EventForm initialValue={this.state.event}
                     formFields={postForm}
                     eventType={type}
                     handleSubmit={(newEvent) => this.handleSubmit(newEvent, 'Post')}
                     title={'postForm.addPost'}
                     enableLocalStorage={true}/>
        );
        break;
      case 'infoposts':
        form = (
          <EventForm initialValue={this.state.event}
                     formFields={infoPostForm}
                     eventType={type}
                     handleSubmit={(newEvent) => this.handleSubmit(newEvent, 'InfoPost')}
                     title={'infoPostForm.addInfoPost'}
                     enableLocalStorage={true}/>
        );
        break;
      case 'tasks':
        form = (
          <EventForm initialValue={this.state.event}
                     formFields={taskForm}
                     eventType={type}
                     handleSubmit={(newEvent) => this.handleSubmit(newEvent, 'Task')}
                     title={'taskForm.addTask'}
                     enableLocalStorage={true}/>
        );
        break;
      case 'reservations':
        form = (
          <ReservationForm handleSubmit={(newEvent) => this.handleSubmit(newEvent, 'Reservation')}/>
        );
        break;
      case 'gallery':
        form = (
          <GalleryForm onPhotosetSubmit={this.handlePhotoSetSubmit} isLoading={this.props.loading}/>
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

function mapStateToProps({events}) {
  return {
    loading: events.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({create, createPhotoset}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
