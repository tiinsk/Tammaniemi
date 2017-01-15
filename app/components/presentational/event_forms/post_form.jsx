import React from 'react';
import TextField from 'react-md/lib/TextFields';
import TextEditor from '../../../partials/text_editor.js';
import translate from '../../../translate.jsx';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        content: ''
      },
      contentError: ''
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps({event}) {
    this.setState({ post: event });
  }

  updateTitle(value) {
    const post = this.state.post;
    post.title = value;
    this.setState({
      post
    });
  }

  updateContent(markdown) {
    const post = this.state.post;
    post.content = markdown;
    this.setState({
      post,
      contentError: '',
    });
  }

  invalidData(post) {
    let contentError = post.content ? '' : 'Please enter content!';
    this.setState({
      contentError: contentError
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.post.title && this.state.post.content) {
      this.state.post.__t = this.state.post.__t || 'Post';
      this.props.handleSubmit(this.state.post);
    } else {
      this.invalidData(this.state.post);
    }
  }

  render() {
    return (
      <div className="form post-form">
          <form onSubmit={this.handleSubmit}>
            <legend className="title">{this.props.strings.postForm.addPost}</legend>
            <TextField type="text" label={this.props.strings.events.title} required={true} value={this.state.post.title} onChange={this.updateTitle} />
            <div className="content">
              <label className={"label " + (this.state.contentError != "" ? "error" : "")}>{this.props.strings.events.content}</label>
              <span className="error-message">{this.state.contentError}</span>
              <TextEditor markdown={this.state.post.content} onChange={this.updateContent} />
            </div>
            <button type="submit" className="submit-btn">{this.props.strings.events.submit}</button>
          </form>
      </div>
    );
  }
}

export default translate(PostForm);
