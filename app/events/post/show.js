import React from 'react';
import PostStore from './post_store';
import PostActions from './post_actions';
import {Link} from 'react-router';
import _ from 'underscore';

import Authenticated from '../../authentication/components/authenticated';

class ShowPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = PostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PostStore.listen(this.onChange);
    PostActions.getPost(this.props.params.postId);
  }

   componentWillUnmount() {
    PostStore.unlisten(this.onChange);
  }
/*
  componentDidUpdate(prevProps) {
    
    // Fetch new charachter data when URL path changes
    if (prevProps.params.postId !== this.props.params.postId) {
      PostActions.getPost(this.props.params.postId);
    }
    
  }
*/
  onChange(state) {
    this.setState(state);
  }

  handleDelete(postId){
    PostActions.deletePost(postId, this.props.jwt);
  }

  render() {    
    let postData;
    
    if (_.isEmpty(this.state.post)) { 
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
        </div>
      )
    }
    

    return (
      <div className='container'>
        {postData}
      </div>
    );
  }
}

export default Authenticated(ShowPost);