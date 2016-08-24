import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import CommentBox from '../comment/comments';
import LoginStore from './../../login/login_store';

export default class Task_S extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "isCommentsShown": false,
      user: LoginStore.getState().user
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

  onChange(state) {
    this.setState({
      user: state.user
    });
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

    const editMenu = (this.state.user._id === this.props.task.userId._id) ?
      (
        <span>
          <div className="edit circle" onClick={this.props.update.bind(this, this.props.task._id)}>
            <i className="fa fa-pencil"></i>
          </div>
          <div className="delete circle" onClick={this.props.delete.bind(this, this.props.task._id)}>
          <i className="fa fa-trash"></i>
          </div>
        </span>
      ) : '';

    return (
      <div className="task-s" >
        <div className="box">
          <div className="primary-symbol">
            <div className="chekbox">
              <div onClick={this.toggleChecked.bind(this)} className={"checkmark " + (this.props.task.isDone ? "checked" : "") } ></div>
            </div>
          </div>
          <div className="secondary-symbol">
            <div className={"img img"+ this.props.task.category} ></div>
          </div>
          {title}
          <div className="details" >
            <span className="detail user">{this.props.task.userId.name}</span>
            <span className="detail created-at" >{moment(this.props.task.createdAt).fromNow()}</span>
            <span className="detail comment-count">{this.props.task.comments.length}</span>
            <div className="edit-menu">
              <div className="circle comments" onClick={this.toggleComments.bind(this)} >
                <i className="fa fa-caret-down"></i>
                <i className="fa fa-comment"></i>
              </div>
              {editMenu}
            </div>
          </div>
        </div>
        {commentBox}
      </div>


    );
  }
}
