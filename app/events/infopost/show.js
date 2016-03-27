import React from 'react';
import EventStore from '../event_store';
import EventActions from '../event_actions';

import {Link} from 'react-router';
import _ from 'underscore';


import history from '../../history';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Event from "../event_layout";


class ShowInfoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infopost: EventStore.getByTypeAndId('infoposts', this.props.params.infopostId)
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    EventStore.listen(this.onChange);
  }

   componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      infopost: EventStore.getByTypeAndId('infoposts', this.props.params.infopostId)
    });
  }

  handleDelete(infopostId){
    EventActions.delete({
      type: 'infoposts',
      id: infopostId
    });
    history.pushState(null, '/infoposts');
  }


  handleUpdate(infopostId){
    history.pushState(null, `/infoposts/update/${infopostId}`);
  }

  render() {
    let infopostData;
    if(this.state.infopost) {
      console.log(this.state.infopost._id);
      if (!this.state.infopost._id) {
        infopostData = (
          <div className="alert alert-danger" role="alert">InfoPost not found!</div>
          );
      }
      else{
        infopostData = (

          <Event className="infopost" event={this.state.infopost} markdownContent secondarySymbol={this.state.infopost.category} addComment={this.handleAddComment}  delete={this.handleDelete} update={this.handleUpdate}>{this.state.infopost.content}</Event>
        )
      }
    }

    return (
      <div className='container'>
        <Row>
          <Col md="6" md-offset="3" >
            {infopostData}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ShowInfoPost;

