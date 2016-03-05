import React from 'react';
import PostStore from './post_store';
import PostActions from './post_actions';
import {Link} from 'react-router';
import _ from 'underscore';

import history from '../../history';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Event from "../event_layout";

class ShowPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    PostStore.listen(this.onChange);
    PostActions.getPost(this.props.params.postId);
  }

   componentWillUnmount() {
    PostStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleDelete(postId){
    PostActions.deletePost(postId, this.props.jwt);
  }

  handleUpdate(postId){
    history.pushState(null, '/posts/update/'+ postId );
  }

  handleAddComment(comment) {
    PostActions.addComment(comment);
  }


  render() {
    let postData;
    if(this.state.post) {
      console.log(this.state.post._id);
      if (!this.state.post._id) {
        postData = (
          <div className="alert alert-danger" role="alert">Post not found!</div>
          );
      }
      else{
        postData = (
          <Event className="post" event={this.state.post} addComment={this.handleAddComment}  delete={this.handleDelete} update={this.handleUpdate}>{this.state.post.content}</Event>
        );
      }
    }


    return (
      <div className='container'>
        <Row>
          <Col md="6" md-offset="3" >
            {postData}
          </Col>
        </Row>

      </div>
    );
  }
}

export default ShowPost;

