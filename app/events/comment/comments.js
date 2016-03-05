import React from 'react';
import PostActions from '../post/post_actions';

class CommentBox extends React.Component{
  constructor(props) {
    super(props);
  }

  handleCommentSubmit(comment) {
    $.ajax({
          type: 'POST',
          url: '/api/comments',
          headers: {Authorization: 'JWT ' + this.props.jwt},
          data: {content: comment.content, eventId: this.props.eventId}
        })
        .done((data) => {
          toastr.success("Comment created successfully!");
          this.props.addComment(data);
        })
        .fail((jqXhr) => {
         toastr.error(jqXhr.responseJSON.message);
        });
        return true;
  }

  handleCommentDelete(commentId) {
    $.ajax({
      type: 'DELETE',
      url: '/api/comments/' + commentId ,
      headers: {Authorization: 'JWT ' + this.props.jwt}
    })
      .done((data) => {
          toastr.success("Comment deleted successfully!");
          let comments = this.props.comments.filter(comment => comment._id !== commentId );
          this.setState({comments: comments});
      })
      .fail((jqXhr) => {
        toastr.error(jqXhr.responseJSON.message);
      });
      return true;
  }

  render() {
    return (
      <div className="comment-box">
        <CommentList onCommentDelete={this.handleCommentDelete.bind(this)} data={this.props.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    );
  }
};

class CommentForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      content: ""
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var content = this.state.content;
    if (!content) {
      return;
    }
    this.props.onCommentSubmit({content: content});
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
};

class CommentList extends React.Component{
  constructor(props){
    super(props);
  }

  handleDelete(commentId) {
    this.props.onCommentDelete(commentId);
  }

  render() {
    var self = this;
    var comment = this.props.data.map(function(comment) {
      console.log(comment);
      return (
        <div className="comment" key={comment._id}>
          <span className="user">{comment.userId}</span><span>{comment.content}</span>
          <i className="delete fa fa-trash" onClick={self.handleDelete.bind(self, comment._id)}></i>
        </div>
      );
    });
    return (
      <div className="comment-list">
        {comment}
      </div>
    );
  }
};

export default CommentBox;

