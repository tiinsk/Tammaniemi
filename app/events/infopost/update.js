import React from 'react';
import InfoPostStore from './infopost_store';
import InfoPostActions from './infopost_actions';
import InfoPostForm from './form';

class UpdateInfoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = InfoPostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    InfoPostStore.listen(this.onChange);
    InfoPostActions.getInfoPost(this.props.params.infopostId);
  }

  componentWillUnmount() {
    InfoPostStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(data) {
    InfoPostActions.updateInfoPost(this.props.params.infopostId, data.title, data.content, this.props.jwt);
  }

render() {
    return (
      <InfoPostForm infopost={this.state.infopost} onInfoPostSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

export default UpdateInfoPost;
