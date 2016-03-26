import React from 'react';
import InfoPostStore from './infopost_store';
import InfoPostActions from './infopost_actions';
import {Link} from 'react-router';
import _ from 'underscore';


import history from '../../history';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Event from "../event_layout";


class ShowInfoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    InfoPostStore.listen(this.onChange);
    InfoPostActions.getInfoPost(this.props.params.infopostId);
  }

   componentWillUnmount() {
    InfoPostStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleDelete(infopostId){
    InfoPostActions.deleteInfoPost(infopostId, this.props.jwt);
  }


  handleUpdate(infopostId){
    history.pushState(null, '/infoposts/update/'+ infopostId );
  }

  handleAddComment(comment) {
    InfoPostActions.addComment(comment);
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

