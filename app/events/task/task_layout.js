import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import CommentBox from '../../components/containers/comment/comment_box.jsx';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "isCommentsShown": false,
      "checked": false
    }
  }

  toggleComments(){
    this.setState({
      "isCommentsShown": !this.state.isCommentsShown
    })
  }

  toggleChekced(){
    this.setState({
      "checked": !this.state.checked
    })
  }

  render() {
    let title;
    if(this.props.to != null){
      title = (
          <Link className={"title " + (this.state.checked ? "overlined": "") } to={this.props.to}>{this.props.task.title}</Link>
        );
    }else{
      title= (
        <div className={"title " + (this.state.checked ? "overlined": "") } >{this.props.task.title}</div>
        );
    }

    let commentBox;
    if (this.state.isCommentsShown) {
      commentBox = (
        <CommentBox comments={this.props.task.comments} eventId={this.props.task._id} addComment={this.props.addComment} />
        );
    }

    return (
      <div className="task" >
        <div className="box">
          <div className="primary-symbol">
            <div className="chekbox">
              <div onClick={this.toggleChekced.bind(this)} className={"checkmark " + (this.state.checked ? "checked" : "") } ></div>
            </div>
          </div>
          <div className="secondary-symbol">
            <div className={"img img"+ this.props.task.category} ></div>
          </div>
          {title}
          <div className="details" >
            <span className="user">{this.props.task.userId.name}</span>
            <span className="created-at" >{moment(this.props.task.createdAt).fromNow()}</span>
            <span className="comment-count">{this.props.task.comments.length}</span>
          </div>
          <div className="edit-menu">
              <i className="update fa fa-pencil-square" onClick={this.props.update.bind(this, this.props.task._id)}></i>
              <i className="delete fa fa-trash" onClick={this.props.delete.bind(this, this.props.task._id)}></i>
          </div>
          <div className="show-comments-btn" onClick={this.toggleComments.bind(this)} >
            <i className="img fa fa-caret-down"></i>
            <i className="img fa fa-comment"></i>
          </div>
        </div>
        {commentBox}
      </div>


    );
  }
}
