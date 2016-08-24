import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import remarkable from '../remarkable';

import commentBox from './comment/comments';
import LoginStore from './../login/login_store';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentsShown: false,
      user: LoginStore.getState().user
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (this.props.commentsOpen) {
      this.setState({
        isCommentsShown: true
      });
    }
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      user: state.user
    });
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

    const editMenu = (this.state.user._id === this.props.event.userId._id) ?
      (
        <span>
          <div className="edit circle" onClick={this.props.update.bind(this, this.props.event._id)}>
            <i className="fa fa-pencil"></i>
          </div>
          <div className="delete circle" onClick={this.props.delete.bind(this, this.props.event._id)}>
          <i className="fa fa-trash"></i>
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
              <div className="circle comments" onClick={this.toggleComments.bind(this)} >
                <i className="fa fa-caret-down"></i>
                <i className="fa fa-comment"></i>
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
