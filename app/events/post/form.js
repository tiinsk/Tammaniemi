import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import TextEditor from '../../partials/text_editor';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      contentError: ''
    };
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      post: newProps.post
    });
  }

  updateTitle(event) {
    let post = this.state.post;
    post.title = event.target.value;
    this.setState({
      post: post
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
      this.props.onPostSubmit(this.state.post);
    } else {
      this.invalidData(this.state.post);
    }
  }

  render() {
    return (
      <div className="form post-form">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <legend className="title">Add new post</legend>
          <Input label="Title" floatingLabel={true} required={true} value={this.state.post.title} onChange={this.updateTitle.bind(this)} />
          <div className="content">
            <label className={"label " + (this.state.contentError != "" ? "error" : "")}>Content</label>
            <span className="error-message">{this.state.contentError}</span>
            <TextEditor markdown={this.state.post.content} onChange={this.updateContent.bind(this)} />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </Form>
      </div>
    );
  }
}

export default PostForm;
