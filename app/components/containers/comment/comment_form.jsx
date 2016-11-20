import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addComment, removeComment } from '../../../actions/event_actions';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const content = this.state.content;
    if (!content) {
      return;
    }
    this.props.addComment({
      content: content,
      eventId: this.props.eventId
    });
    this.setState({content: ''});
  }

  handleTextChange(e) {
    this.setState({content: e.target.value});
  }

  render() {
    return (
      <form className="comment-form" onSubmit={(event) => this.handleSubmit(event)}>
        <div className="comment-input">
          <input
            className="comment-input-field"
            type="text"
            placeholder="Write comment..."
            value={this.state.content}
            onChange={this.handleTextChange.bind(this)}
          />
          <span className="comment-btn">
            <button className="btn" type="submit">Comment</button>
          </span>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addComment, removeComment}, dispatch);
}

export default connect(null, mapDispatchToProps)(CommentForm);
