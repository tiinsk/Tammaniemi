import React from 'react';
import PostStore from '../stores/update';
import PostActions from '../actions/update';

import Authenticated from '../../../authentication/components/authenticated';

class UpdatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = PostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PostStore.listen(this.onChange);
    PostActions.getPost(this.props.params.postId);
  }

  componentWillUnmount() {
    PostStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.postId !== this.props.params.postId) {
      PostActions.getPost(this.props.params.postId);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var title = this.state.title;
    var content = this.state.content;

    if (!title) {
      PostActions.invalidTitle();
      //this.refs.nameTextField.getDOMNode().focus();
    }

    if (!content) {
      PostActions.invalidContent();
    }

    if (title && content) {
      PostActions.updatePost(this.props.params.postId, title, content, this.props.jwt);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Update Post</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.titleValidationState}>
                    <label className='control-label'>Title</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.title}
                           onChange={PostActions.updateTitle} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.contentValidationState}>
                    <label className='control-label'>Content</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.content}
                           onChange={PostActions.updateContent} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>

                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Authenticated(UpdatePost);