import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InfoPostForm from '../presentational/event_forms/infopost_form.jsx';
import PostForm from '../presentational/event_forms/post_form.jsx';
import TaskForm from '../presentational/event_forms/task_form.jsx';
import ReservationForm from '../presentational/event_forms/reservation_form.jsx';
import GalleryForm from '../presentational/event_forms/gallery_form.jsx';
import {create, createPhotoset} from '../../actions/event_actions';


class EventCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhotoSetSubmit = this.handlePhotoSetSubmit.bind(this);
  }

  handleSubmit(newEvent) {
    this.props.create(newEvent);
  }

  handlePhotoSetSubmit(photoset) {
    this.props.createPhotoset(photoset);
  }


  render() {
    let form = null;
    const {type} = this.props.params;
    switch (type) {
      case 'posts':
        form = (
          <PostForm handleSubmit={this.handleSubmit}/>
        );
        break;
      case 'infoposts':
        form = (
          <InfoPostForm handleSubmit={this.handleSubmit}/>
        );
        break;
      case 'tasks':
        form = (
          <TaskForm handleSubmit={this.handleSubmit}/>
        );
        break;
      case 'reservations':
        form = (
          <ReservationForm handleSubmit={this.handleSubmit}/>
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
