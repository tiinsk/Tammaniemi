import React from 'react';
import PostForm from './form';
import PostActions from './post_actions';
import PostStore from './post_store';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';


import Authenticated from '../../authentication/components/authenticated';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = PostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    PostStore.listen(this.onChange);
    PostActions.setEmptyPost();
  }

  componentWillUnmount() {
    PostStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(post){
    PostActions.addPost(post, this.props.jwt);
  }

  render() {
    return (
      <Row>
          <Col md="8" md-offset="2" >
            <PostForm post={this.state.post} onPostSubmit={this.handleSubmit.bind(this)}/>
          </Col>
        </Row>
      
    );
  }
}

export default Authenticated(AddPost);