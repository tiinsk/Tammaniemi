import React from 'react';
import EventActions from '../event_actions';

const commentList = (comments, onCommentDelete, user) => {
  const deleteMenu = (comment) => comment.userId._id === user._id ?
    (<i
      className="delete fa fa-trash"
      onClick={() => {
        onCommentDelete(comment._id);
      }}
    ></i>) : '';

  const commentList = comments.map((comment) =>
    (
      <div className="comment" key={comment._id}>
        <span className="user">{comment.userId.name}</span><span>{comment.content}</span>
        {deleteMenu(comment)}
      </div>
    )
  );
  return (
    <div className="comment-list">
      {commentList}
    </div>
  );
};

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const content = this.state.content;
    if (!content) {
      return;
    }
    this.props.onCommentSubmit({content});
    this.setState({content: ''});
  }

  handleTextChange(e) {
    this.setState({content: e.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Write comment..."
            value={this.state.content}
            onChange={this.handleTextChange.bind(this)}
          />
          <span className="input-group-btn">
            <button className="btn" type="submit">Comment</button>
          </span>
        </div>
      </form>
    );
  }
}

const commentBox = (comments, eventId, user) => {
  function handleCommentSubmit(comment) {
    EventActions.create({
      type: 'comments',
      content: {
        content: comment.content,
        eventId
      }
    });
  }

  function handleCommentDelete(commentId) {
    EventActions.delete({
      type: 'comments',
      id: commentId
    });
  }

  return (
    <div className="comment-box">
      {commentList(comments, handleCommentDelete, user)}
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default commentBox;

