import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { Link } from 'react-router';
import moment from 'moment';
import remarkable from '../../remarkable';

import { remove } from '../../actions/event_actions';

import TaskCheckBox from '../presentational/task_checkbox.jsx';
import CommentBox from './comment/comment_box.jsx';

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

  markupToHtml(content) {
    return { __html: remarkable.render(content.toString()) };
  }

  handleDelete(event) {
    this.props.remove(event.__t, event._id);
  }

  handleUpdate(event) {
    this.props.router.push(`/${event.__t}/update/${event._id}`);
  }

  render() {
    const eventType = this.props.event.__t.toLowerCase();
    let linkToEvent = null;

    let primarySymbol = (
      <div className="img"></div>
    );
    let secondarySymbol = null;
    let content = this.props.event.content;
    switch (eventType) {
      case "task":
        linkToEvent = (<Link className="title"
          to={`/${eventType}s/${this.props.event.category}/${this.props.event._id}`}>
          {this.props.event.title}
        </Link>);
        primarySymbol = (
          <TaskCheckBox
            isDone={this.props.event.isDone}
            id={this.props.event._id}
            />
        );
        secondarySymbol = (
          <div className="secondary-symbol">
            <div className={`img num${this.props.event.category}`}></div>
          </div>
        );
        break;
      case "reservation":
      linkToEvent = (<Link className="title"
          to={`/${eventType}s`}>
          {this.props.event.title}
        </Link>);
        content = (
          <div className="content">
            <span className="start-date">{moment(this.props.event.startDate).format("DD.MM.YYYY")}</span>
            <span className="separator">-</span>
            <span className="end-date">{moment(this.props.event.endDate).format("DD.MM.YYYY")}</span>
          </div>
        );
        break;
      case "infopost":
        linkToEvent = (<Link className="title"
          to={`/${eventType}s/${this.props.event.category}/${this.props.event._id}`}>
          {this.props.event.title}
        </Link>);
        secondarySymbol = (
          <div className="secondary-symbol">
            <div className={`img num${this.props.event.category}`}></div>
          </div>
        );
        content = (
          <div
            className="content"
            dangerouslySetInnerHTML={this.markupToHtml(this.props.event.content)}
            ></div>
        );
        break;
      case "post":
        const createdAt = moment(this.props.event.createdAt);
        const year = createdAt.year();
        const month = createdAt.month();
        linkToEvent = (<Link className="title"
          to={`/${eventType}s/${year}/${month}/${this.props.event._id}`}>
          {this.props.event.title}
        </Link>);
        content = (
          <div
            className="content"
            dangerouslySetInnerHTML={this.markupToHtml(this.props.event.content)}
            ></div>
        );
        break;
    }

    return (
      <div className={`event ${eventType}`} >
        <div className="box">
          <div className="primary-symbol">
            {primarySymbol}
          </div>
          {secondarySymbol}
          {linkToEvent}
          {content}
          <div className="info">
            <div className="details">
              <div className="detail user">{this.props.event.userId.name}</div>
              <div className="detail created-at" >
                {moment(this.props.event.createdAt).fromNow()}
              </div>
              <div className="detail comment-count" onClick={() => this.toggleComments()}>{this.props.event.comments.length}</div>
            </div>
            <div className="edit-menu">
              <div className="color-circle comments" onClick={() => this.toggleComments()} >
                <div className="icon icon-comment"></div>
                <div className="icon icon-down"></div>
              </div>
              {(this.props.auth.user._id === this.props.event.userId._id) || this.props.auth.user.role === 'admin' ?
                  <div className="edit color-circle" onClick={() => this.handleUpdate(this.props.event)}>
                    <div className="icon icon-pencil"></div>
                  </div> : null
              }
              {(this.props.auth.user._id === this.props.event.userId._id) || this.props.auth.user.role === 'admin' ?
                  <div className="delete color-circle" onClick={() => this.handleDelete(this.props.event)}>
                    <div className="icon icon-trash"></div>
                  </div>
                : null
              }
            </div>
          </div>
        </div>
        {this.state.isCommentsShown ?
          <CommentBox
            comments={this.props.event.comments}
            eventId={this.props.event._id}
            user={this.props.auth.user}
            /> :
          null
        }
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remove }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event));
