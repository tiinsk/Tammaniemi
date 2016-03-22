import React from 'react';
import TextEditor from '../../partials/text_editor';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      titleError: '',
      contentError: '',
      errorMessage: '',
      titleValidationState: '',
      contentValidationState: '',
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
      post: post,
      titleValidationState: '',
      titleError: '',
    });
  }

  updateContent(markdown) {
    const post = this.state.post;
    post.content = markdown;
    this.setState({
      post,
      titleValidationState: '',
      titleError: '',
    });
  }

  invalidData(post) {
    console.log("invalidData");
    let titleError = post.title ? '' : 'Please enter title!';
    let contentError = post.content ? '' : 'Please enter content!';

    let titleValidationState = post.title ? 'has-success' : 'has-error';
    let contentValidationState = post.content ? 'has-success' : 'has-error';
    this.setState({
      titleError: titleError,
      contentError: contentError,
      titleValidationState: titleValidationState,
      contentValidationState: contentValidationState
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
      <div className="container">
        <div className="row flipInX animated">
          <div className="col-sm-8">
            <div className="panel panel-default">
              <div className="panel-heading">Post</div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={"form-group " + this.state.titleValidationState}>
                    <label className="control-label">Title</label>
                    <input type="text" className="form-control" value={this.state.post.title}
                           onChange={this.updateTitle.bind(this)} autoFocus/>
                    <span className="help-block">{this.state.titleError}</span>
                  </div>
                  <div className={"form-group " + this.state.contentValidationState}>
                    <label className="control-label">Content</label>
                    <TextEditor markdown={this.state.post.content} onChange={this.updateContent.bind(this)} />
                    <span className="help-block">{this.state.contentError}</span>
                  </div>

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
