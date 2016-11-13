import React from 'react';

import CommentForm from './comment_form.jsx';
import CommentList from './comment_list.jsx';

const CommentBox = ({comments, eventId, user}) => {

  return (
    <div className="comment-box">
      {comments.length ?
        <CommentList
          comments={comments}
          user={user}
        />
        : null
      }
      <CommentForm eventId={eventId}/>
    </div>
  );
};

export default CommentBox;



