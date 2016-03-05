import React from 'react';

class CommentBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments
    }
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
          let comments = this.state.comments;
          comments.push(data);
          this.setState({comments: comments});
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
          let comments = this.state.comments.filter(comment => comment._id !== commentId );
          this.setState({comments: comments});
      })
      .fail((jqXhr) => {
        toastr.error(jqXhr.responseJSON.message);
      });
      return true;
  }

  render() {
    return (
      <div className="commentBox">
        <div>Comments</div>
        <CommentList onCommentDelete={this.handleCommentDelete.bind(this)} data={this.state.comments} />
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
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          placeholder="Write comment..."
          value={this.state.content}
          onChange={this.handleTextChange.bind(this)}
        />
        <input type="submit" value="Post" />
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
      return (
        <div className="comment" key={comment._id}>
          {comment.userId}: {comment.content}
          <a onClick={self.handleDelete.bind(self, comment._id)}> Delete</a>
        </div>
      );
    });
    return (
      <div className="commentList">
        {comment}
      </div>
    );
  }
};

export default CommentBox;
