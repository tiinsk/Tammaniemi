import React from 'react';
import PostForm from './form';
import EventActions from '../event_actions';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(post) {
    EventActions.create({
      type: 'posts',
      content: post
    });
  }

  render() {
    return (
      <Row>
          <Col md="8" md-offset="2" >
            <PostForm post={this.state.post} onPostSubmit={this.handleSubmit.bind(this)} />
          </Col>
        </Row>

    );
  }
}

export default AddPost;
