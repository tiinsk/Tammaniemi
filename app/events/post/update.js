import React from 'react';
import PostStore from './post_store';
import PostActions from './post_actions';
import PostForm from './form';

class UpdatePost extends React.Component {
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

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(data) {
    PostActions.updatePost(this.props.params.postId, data.title, data.content, this.props.jwt);
  }

render() {
    return (
      <PostForm post={this.state.post} onPostSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

export default UpdatePost;
