import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import InfoPostStore from './infopost_store';
import InfoPostActions from './infopost_actions';

import history from '../../history';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Event from "../event_layout";

class IndexInfoPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = InfoPostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    InfoPostStore.listen(this.onChange);
    InfoPostActions.getInfoPosts(this.props.params);
  }

  componentWillUnmount() {
    InfoPostStore.unlisten(this.onChange);
  }
/*
  componentDidUpdate(prevProps) {
    console.log("updated");
    if (!isEqual(prevProps.params, this.props.params)) {
      InfoPostActions.getInfoPosts(this.props.params);
    }
  }
*/
  handleDelete(infopostId){
    console.log("handleDelete: ", infopostId);
    InfoPostActions.deleteInfoPost(infopostId, this.props.jwt);
  }

  handleUpdate(infopostId){
    history.pushState(null, '/infoposts/update/'+ infopostId );
  }

  handleAddComment(comment) {
    InfoPostActions.addComment(comment);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let infopostList = this.state.infoposts.map((infopost, index) => {
      return (

          <Event key={infopost._id} markdownContent className="infopost" event={infopost} to={`/infoposts/${infopost._id}`} secondarySymbol={infopost.category} addComment={this.handleAddComment} delete={this.handleDelete} update={this.handleUpdate}>{infopost.content}</Event>
      );
    });

    return (
      <div className='container'>
        <Row>
          <Col md="6" md-offset="3" >
            {infopostList}
          </Col>
        </Row>
      </div>
    );
  }
}

export default IndexInfoPosts;
