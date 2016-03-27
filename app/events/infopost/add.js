import React from 'react';
import InfoPostForm from './form';
import EventActions from '../event_actions';


class AddInfoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infopost: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(infopost){
    EventActions.create({
      type: 'infoposts',
      content: infopost
    });
  }

  render() {
    return (
      <InfoPostForm infopost={this.state.infopost} onInfoPostSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

export default AddInfoPost;
