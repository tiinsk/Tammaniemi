import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import PostStore from './post_store';
import PostActions from './post_actions';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import history from '../../history';

import Event from "../event_layout";

class IndexPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = PostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PostStore.listen(this.onChange);
    PostActions.getPosts(this.props.params);
  }

  componentWillUnmount() {
    PostStore.unlisten(this.onChange);
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

  onChange(state) {
    this.setState(state);
  }

  render() {
    let postList = this.state.posts.map((post, index) => {
      return (
        <Event key={post._id} className="post" event={post} to={`/posts/${post._id}`} addComment={this.handleAddComment} delete={this.handleDelete} update={this.handleUpdate}>{post.content}</Event>
      );
    });

    return (
      <div className='container'>
        <Row>
          <Col md="6" md-offset="3" >
            {postList}
          </Col>
        </Row>

      </div>
    );
  }
}

export default IndexPosts;

