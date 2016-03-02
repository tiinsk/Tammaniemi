import React from 'react';
import {Link} from 'react-router';

import CommentBox from './comment/comments';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {    
    return (
      <div className={this.props.className}>
          <div>Title: {this.props.event.title}</div>
          <div>CreatedAt: {this.props.event.createdAt}</div>
          <div>UserId: {this.props.event.userId}</div>
          <div>
            <a onClick={this.props.delete.bind(this, this.props.event._id)}>Delete</a>
            <a onClick={this.props.update.bind(this, this.props.event._id)}>Update</a>
          </div>
          <CommentBox comments={this.props.event.comments} eventId={this.props.event._id} />
          <div>Children: {this.props.children}</div>
        </div>
    );
  }
}

