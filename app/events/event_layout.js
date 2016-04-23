import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import remarkable from '../remarkable';

import CommentBox from './comment/comments';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "isCommentsShown": false
    }
  }

  componentWillMount(){
    if (this.props.commentsOpen) {
      this.setState({
        isCommentsShown: true
      })
    };
  }

  toggleComments(){
    this.setState({
      "isCommentsShown": !this.state.isCommentsShown
    })
  }

  markupToHtml() {
    return { __html: remarkable.render(this.props.children.toString()) };
  }

  render() {
    let secondarySymbol;
    if (this.props.secondarySymbol != null) {
      secondarySymbol = (
        <div className="secondary-symbol">
          <div className={"img num" + this.props.secondarySymbol}></div>
        </div>
      );
    }

    let title;
    if(this.props.to != null){
      title = (
          <Link className="title" to={this.props.to}>{this.props.event.title}</Link>
        );
    }else{
      title= (
        <div className="title" >{this.props.event.title}</div>
        );
    }

    let commentBox;
    if (this.state.isCommentsShown) {
      commentBox = (
        <CommentBox comments={this.props.event.comments} eventId={this.props.event._id} addComment={this.props.addComment} />
        );
    }
    let content;
    if (this.props.markdownContent) {
      content = (<div className="content" dangerouslySetInnerHTML={this.markupToHtml()}></div>);
    } else {
      content = (<div className="content">{this.props.children}</div>);
    }

    return (
      <div className={"event " + this.props.className} >
        <div className="box">
          <div className="primary-symbol">
            <div className="img"></div>
          </div>
          {secondarySymbol}
          <div className="left-details" >
            <div className="user">{this.props.event.userId.name}</div>
            <div className="created-at" >{moment(this.props.event.createdAt).fromNow()}</div>
            <div className="comment-count">{this.props.event.comments.length}</div>
          </div>
          {title}
          {content}
          <div className="edit-menu">
              <i className="update fa fa-pencil-square" onClick={this.props.update.bind(this, this.props.event._id)}></i>
              <i className="delete fa fa-trash" onClick={this.props.delete.bind(this, this.props.event._id)}></i>
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
