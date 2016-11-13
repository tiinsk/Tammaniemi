import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { removeComment } from '../../actions/event_actions';

const CommentList =({comments, user, removeComment}) => {
  const deleteMenu = (comment) => comment.userId._id === user._id ? (
    <div
      className="delete"
      onClick={() => removeComment(comment._id)}
    />
  ) : null;

  const commentList = comments.map((comment) =>
    (
      <div className="comment" key={comment._id}>
        <span className="user">{comment.userId.name}</span><span>{comment.content}</span>
        <div className="date">{moment(comment.createdAt).fromNow()}</div>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeComment}, dispatch);
}

export default connect(null, mapDispatchToProps)(CommentList);
