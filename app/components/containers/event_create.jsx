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
  }

  componentWillMount(){
    const {type} = this.props.params;
    this.setState({
      event: JSON.parse(localStorage.getItem(type)),
      lastEditTime: 0
    });
  }

  saveToLocalStorage = () => {
     const newEditTime = Date.now();
     if(newEditTime - this.state.lastEditTime > 10*1000){
       localStorage.setItem(this.props.params.type, JSON.stringify(this.state.event));
       this.setState({
         lastEditTime: newEditTime
       });
     }
   };

  handleSubmit = (newEvent) => {
    const {type} = this.props.params;
    newEvent.__t = type;
    this.props.create(newEvent)
      .then(() => {
        localStorage.removeItem(type);
      })
      .catch(() => {/*do nothing*/});
  };

  handlePhotoSetSubmit = (photoset) => {
    this.props.createPhotoset(photoset);
  };

  render() {
    let form = null;
    const {type} = this.props.params;
    switch (type) {
      case 'posts':
        form = (
          <EventForm formFields={postForm}
                     handleSubmit={(newEvent) => this.handleSubmit(newEvent, 'Post')}
                     saveToLocalStorage={this.saveToLocalStorage}
                     title={'postForm.addPost'}/>
        );
        break;
      case 'infoposts':
        form = (
          <EventForm formFields={infoPostForm}
                     handleSubmit={(newEvent) => this.handleSubmit(newEvent, 'InfoPost')}
                     saveToLocalStorage={this.saveToLocalStorage}
                     title={'infoPostForm.addInfoPost'}/>
        );
        break;
      case 'tasks':
        form = (
          <EventForm formFields={taskForm}
                     handleSubmit={(newEvent) => this.handleSubmit(newEvent, 'Task')}
                     saveToLocalStorage={this.saveToLocalStorage}
                     title={'taskForm.addTask'}/>
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
