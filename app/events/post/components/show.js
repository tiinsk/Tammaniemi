import React from 'react';
import PostStore from '../stores/show';
import PostActions from '../actions/show';
import {Link} from 'react-router';

import Authenticated from '../../../authentication/components/authenticated';

class ShowPost extends React.Component {
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
    // Fetch new charachter data when URL path changes
    if (prevProps.params.postId !== this.props.params.postId) {
      PostActions.getPost(this.props.params.postId);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  handleDelete(postId){
    PostActions.deletePost(postId, this.props.jwt);
  }

  render() {
    return (
      <div className='container'>
          <h2><strong>{this.state.post.title}</strong></h2>
          <h4 className='lead'>{this.state.post.content}</h4>
          <a onClick={this.handleDelete.bind(this, this.state.post._id)}>Delete</a>
          <Link to={`/posts/update/${this.state.post._id}`}>Update</Link>
      </div>
    );
  }
}

export default Authenticated(ShowPost);