import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Link} from 'react-router';
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

  handleUpdate() {
    console.log("Not yet implemented!!");
    return true;
  }

  render() {
    const eventType = this.props.event.__t.toLowerCase();

    let primarySymbol = (
      <div className="img"></div>
    );
    let secondarySymbol = null;
    let content = this.props.event.content;
    switch (eventType){
      case "task":
        primarySymbol =(
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
        content = (
          <div className="content">
            <span className="start-date">{moment(this.props.event.startDate).format("DD.MM.YYYY")}</span>
            <span className="separator">-</span>
            <span className="end-date">{moment(this.props.event.endDate).format("DD.MM.YYYY")}</span>
          </div>
        );
        break;
      case "infopost":
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
          <Link
            className="title"
            to={`/${eventType}s/${this.props.event._id}`}
          >
            {this.props.event.title}
          </Link>
          {content}
          <div className="details" >
            <span className="detail user">{this.props.event.userId.name}</span>
            <span className="detail created-at" >
              {moment(this.props.event.createdAt).fromNow()}
            </span>
            <span className="detail comment-count">{this.props.event.comments.length}</span>
          </div>
          <div className="edit-menu">
            <div className="color-circle comments" onClick={this.toggleComments.bind(this)} >
              <div className="icon icon-comment"></div>
              <div className="icon icon-down"></div>
            </div>
            { (this.props.auth.user._id === this.props.event.userId._id) ?
              <span>
                    <div className="edit color-circle" onClick={() => this.handleUpdate(this.props.event._id)}>
                      <div className="icon icon-pencil"></div>
                    </div>
                    <div className="delete color-circle" onClick={() => this.handleDelete(this.props.event)}>
                      <div className="icon icon-trash"></div>
                    </div>
                  </span>
              : null
            }
          </div>
        </div>
        { this.state.isCommentsShown ?
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
  return bindActionCreators({remove}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
