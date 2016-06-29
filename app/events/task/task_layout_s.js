import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import CommentBox from '../comment/comments';

export default class Task_S extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "isCommentsShown": false
    }
  }

  toggleComments(){
    this.setState({
      "isCommentsShown": !this.state.isCommentsShown
    })
  }

  toggleChecked(){
    this.props.toggleChecked(this.props.task._id)
  }

  render() {
    let title;
    if(this.props.to != null){
      title = (
        <div className="title-container">
          <Link className={"title " + (this.props.task.isDone ? "overlined": "") } to={this.props.to}>{this.props.task.title}</Link>
        </div>
        );
    }else{
      title= (
        <div className={"title " + (this.props.task.isDone ? "overlined": "") } >{this.props.task.title}</div>
        );
    }

    let commentBox;
    if (this.state.isCommentsShown) {
      commentBox = (
        <CommentBox comments={this.props.task.comments} eventId={this.props.task._id} addComment={this.props.addComment} />
        );
    }

    return (
      <div className="task-s" >
        <div className="box">
          <div className="primary-symbol">
            <div className="chekbox">
              <div onClick={this.toggleChecked.bind(this)} className={"checkmark " + (this.props.task.isDone ? "checked" : "") } ></div>
            </div>
          </div>
          {title}
          <div className="details" >
            <span className="detail user">{this.props.task.userId.name}</span>
            <span className="detail created-at" >{moment(this.props.task.createdAt).fromNow()}</span>
            <span className="detail comment-count">{this.props.task.comments.length}</span>
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
