import React from 'react';
import EventStore from '../event_store';
import EventActions from '../event_actions';
import PostForm from './form';

class UpdatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: EventStore.getByTypeAndId('posts', this.props.params.postId)
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState({
      post: EventStore.getByTypeAndId('posts', this.props.params.postId)
    });
  }

  handleSubmit(data) {
    const content = this.state.post;
    content.title = data.title;
    content.content = data.content;

    EventActions.update({
      type: 'posts',
      content
    });
  }

  render() {
    return (
      <PostForm post={this.state.post} onPostSubmit={this.handleSubmit.bind(this)} />
    );
  }
}

export default UpdatePost;
