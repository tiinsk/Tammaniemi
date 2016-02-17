import React from 'react';
import PostForm from './form';
import PostActions from './post_actions';
import PostStore from './post_store';

import Authenticated from '../../authentication/components/authenticated';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = PostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    PostStore.listen(this.onChange);
    PostActions.setEmptyPost();
  }

  componentWillUnmount() {
    PostStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(post){
    PostActions.addPost(post, this.props.jwt);
  }

  render() {
    return (
      <PostForm post={this.state.post} onPostSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

export default Authenticated(AddPost);