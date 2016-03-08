import React from 'react';

import EventActions from '../event_actions';
import EventStore from '../event_store';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import history from '../../history';

import Event from '../event_layout';

class IndexPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: EventStore.getByType('posts')
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      posts: state.posts
    });
  }

  handleDelete(postId) {
    EventActions.delete({
      type: 'posts',
      id: postId
    });
  }

  handleUpdate(postId) {
    history.pushState(null, `/posts/update/${postId}`);
  }

  render() {
    const postList = this.state.posts.map((post) =>
      (
        <Event key={post._id} className="post"
          event={post}
          to={`/posts/${post._id}`}
          delete={this.handleDelete}
          update={this.handleUpdate}
        >
          {post.content}
        </Event>
      )
    );

    return (
      <div className="container">
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

