import React from 'react';
import Textfield from 'react-mdl/lib/Textfield';

import TextEditor from '../../../partials/text_editor.js';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('Post form constructor');
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

  updateTitle(event) {
    const post = this.state.post;
    post.title = event.target.value;
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
      <div className="form post-form row">
        <div className="col-xs-offset-2 col-xs-8">
          <form onSubmit={this.handleSubmit}>
            <legend className="title">Add new post</legend>
            <Textfield type="text" label="Otsikko" required={true} value={this.state.post.title} onChange={this.updateTitle} />
            <div className="content">
              <label className={"label " + (this.state.contentError != "" ? "error" : "")}>Sisältö</label>
              <span className="error-message">{this.state.contentError}</span>
              <TextEditor markdown={this.state.post.content} onChange={this.updateContent} />
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
