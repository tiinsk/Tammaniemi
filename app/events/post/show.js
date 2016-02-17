import React from 'react';
import PostStore from './post_store';
import PostActions from './post_actions';
import {Link} from 'react-router';
import _ from 'underscore';

import Authenticated from '../../authentication/components/authenticated';
import CommentBox from '../comment/comments';

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
          <div>
            <div>Title: {this.state.post.title}</div>
            <div>Content: {this.state.post.content}</div>
            <div>CreatedAt: {this.state.post.createdAt}</div>
            <div>UserId: {this.state.post.userId}</div>
            <div>
              <a onClick={this.handleDelete.bind(this, this.state.post._id)}>Delete</a>
            </div>
            <div>
              <Link to={`/posts/update/${this.state.post._id}`}>Update</Link>
            </div>
            <CommentBox comments={this.state.post.comments} eventId={this.state.post._id} />
          </div>
          
        )
      }
    }
    

    return (
      <div className='container'>
        {postData}
      </div>
    );
  }
}

export default Authenticated(ShowPost);