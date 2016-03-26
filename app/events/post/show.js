import React from 'react';
import EventStore from '../event_store';
import EventActions from '../event_actions';

import history from '../../history';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Event from '../event_layout';

class ShowPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: EventStore.getByTypeAndId('posts', this.props.params.postId)
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
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

  handleDelete(postId) {
    EventActions.delete({
      type: 'posts',
      id: postId
    });
    history.pushState(null, '/posts');
  }

  handleUpdate(postId) {
    history.pushState(null, `/posts/update/${postId}`);
  }

  render() {
    let postData;
    if (this.state.post) {
      if (!this.state.post._id) {
        postData = (
          <div className="alert alert-danger" role="alert">Post not found!</div>
          );
      } else {
        postData = (
          <Event className="post"
            event={this.state.post}
            markdownContent
            delete={this.handleDelete}
            update={this.handleUpdate}
          >
            {this.state.post.content}
          </Event>
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

