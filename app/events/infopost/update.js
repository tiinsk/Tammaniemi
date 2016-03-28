import React from 'react';
import EventStore from '../event_store';
import EventActions from '../event_actions';
import InfoPostForm from './form';

class UpdateInfoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infopost: EventStore.getByTypeAndId('infoposts', this.props.params.infopostId)
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
     EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
     EventStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      infopost: EventStore.getByTypeAndId('infoposts', this.props.params.infopostId)
    });
  }

  handleSubmit(data) {
    const content = this.state.infopost;
    content.title = data.title;
    content.content = data.content;
    content.category = data.category;

    EventActions.update({
      type: 'infoposts',
      content
    });

  }

render() {
    return (
      <InfoPostForm infopost={this.state.infopost} onInfoPostSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

export default UpdateInfoPost;
