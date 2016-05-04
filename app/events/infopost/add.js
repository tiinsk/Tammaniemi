import React from 'react';
import InfoPostForm from './form';
import EventActions from '../event_actions';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class AddInfoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infopost: {
        category: 0
      }
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
      <div className="container">
        <div className="page-title">
          Add new infopost
        </div>
        <div className="app-row-only">
          <div className="col-main-only" >
            <InfoPostForm infopost={this.state.infopost} onInfoPostSubmit={this.handleSubmit.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default AddInfoPost;
