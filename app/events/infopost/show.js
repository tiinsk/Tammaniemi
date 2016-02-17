import React from 'react';
import InfoPostStore from './infopost_store';
import InfoPostActions from './infopost_actions';
import {Link} from 'react-router';
import _ from 'underscore';

import Authenticated from '../../authentication/components/authenticated';
import CommentBox from '../comment/comments';

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
          <div>
            <div>Category: {this.state.infopost.category} </div>
            <div>Title: {this.state.infopost.title}</div>
            <div>Content: {this.state.infopost.content}</div>
            <div>CreatedAt: {this.state.infopost.createdAt}</div>
            <div>UserId: {this.state.infopost.userId}</div>
            <div>
              <a onClick={this.handleDelete.bind(this, this.state.infopost._id)}>Delete</a>
            </div>
            <div>
              <Link to={`/infoposts/update/${this.state.infopost._id}`}>Update</Link>
            </div>
            <CommentBox comments={this.state.infopost.comments} eventId={this.state.infopost._id} />
          </div>
          
        )
      }
    }
    

    return (
      <div className='container'>
        {infopostData}
      </div>
    );
  }
}

export default Authenticated(ShowInfoPost);