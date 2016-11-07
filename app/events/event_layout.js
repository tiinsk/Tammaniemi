import React from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router';
import moment from 'moment';
import remarkable from '../remarkable';

import commentBox from './comment/comments';
import LoginStore from './../login/login_store';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentsShown: false,
    };
  }

  componentWillMount() {
    if (this.props.commentsOpen) {
      this.setState({
        isCommentsShown: true
      });
    }
  }

  toggleComments() {
    this.setState({
      isCommentsShown: !this.state.isCommentsShown
    });
  }

  markupToHtml() {
    return { __html: remarkable.render(this.props.children.toString()) };
  }

  render() {
    let secondarySymbol;
    if (this.props.secondarySymbol !== null) {
      secondarySymbol = (
        <div className="secondary-symbol">
          <div className={`img num${this.props.secondarySymbol}`}></div>
        </div>
      );
    }

    let title;
    if (this.props.to) {
      title = (
          <Link className="title" to={this.props.to}>{this.props.event.title}</Link>
        );
    } else {
      title = (
        <div className="title" >{this.props.event.title}</div>
        );
    }

    let commentList;
    if (this.state.isCommentsShown) {
      commentList = commentBox(this.props.event.comments, this.props.event._id, this.state.user);
    }
    let content;
    if (this.props.markdownContent) {
      content = (<div className="content" dangerouslySetInnerHTML={this.markupToHtml()}></div>);
    } else {
      content = (<div className="content">{this.props.children}</div>);
    }

    const editMenu = (this.props.auth.user._id === this.props.event.userId._id) ?
      (
        <span>
          <div className="edit color-circle" onClick={this.props.update.bind(this, this.props.event._id)}>
            <div className="icon icon-pencil"></div>
          </div>
          <div className="delete color-circle" onClick={this.props.delete.bind(this, this.props.event._id)}>
            <div className="icon icon-trash"></div>
          </div>
        </span>
      ) : '';

    return (
      <div className={`event ${this.props.className}`} >
        <div className="box">
          <div className="primary-symbol">
            <div className="img"></div>
          </div>
          {secondarySymbol}
          {title}
          {content}
          <div className="details" >
            <span className="detail user">{this.props.event.userId.name}</span>
            <span className="detail created-at" >
              {moment(this.props.event.createdAt).fromNow()}
            </span>
            <span className="detail comment-count">{this.props.event.comments.length}</span>
            <div className="edit-menu">
              <div className="color-circle comments" onClick={this.toggleComments.bind(this)} >
                <div className="icon icon-comment"></div>
                <div className="icon icon-down"></div>
              </div>
              {editMenu}
            </div>
          </div>
        </div>
        {commentList}
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    auth
  }
}

export default connect(mapStateToProps, null)(Event);
