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
      <Row>
        <Col md="6" md-offset="3" >
          <InfoPostForm infopost={this.state.infopost} onInfoPostSubmit={this.handleSubmit.bind(this)}/>
        </Col>
      </Row>
    );
  }
}

export default AddInfoPost;
