import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import PostStore from './post_store';
import PostActions from './post_actions';

import Authenticated from '../../authentication/components/authenticated';

class IndexPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = PostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PostStore.listen(this.onChange);
    PostActions.getPosts(this.props.params);
  }

  componentWillUnmount() {
    PostStore.unlisten(this.onChange);
  }
/*
  componentDidUpdate(prevProps) {
    console.log("updated");
    if (!isEqual(prevProps.params, this.props.params)) {
      PostActions.getPosts(this.props.params);
    }
  }
*/
  onChange(state) {
    this.setState(state);
  }

  render() {
    let postList = this.state.posts.map((post, index) => {
      return (
              <div key={post._id} className=''>
                <h4>
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </h4>
                
              </div>
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {postList}
        </div>
      </div>
    );
  }
}

export default Authenticated(IndexPosts);