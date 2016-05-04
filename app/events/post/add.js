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
      <div className="container">
        <div className="page-title">
          Add new post
        </div>
        <div className="app-row-only">
          <div className="col-main-only">
            <PostForm post={this.state.post} onPostSubmit={this.handleSubmit.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default AddPost;
