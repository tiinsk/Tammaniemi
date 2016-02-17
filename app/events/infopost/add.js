import React from 'react';
import InfoPostForm from './form';
import InfoPostActions from './infopost_actions';
import InfoPostStore from './infopost_store';

import Authenticated from '../../authentication/components/authenticated';

class AddInfoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = InfoPostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    InfoPostStore.listen(this.onChange);
    InfoPostActions.setEmptyInfoPost();
  }

  componentWillUnmount() {
    InfoPostStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(infopost){
    InfoPostActions.addInfoPost(infopost, this.props.jwt);
  }

  render() {
    return (
      <InfoPostForm infopost={this.state.infopost} onInfoPostSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

export default Authenticated(AddInfoPost);