import React from 'react';
import EventStore from '../event_store';
import EventActions from '../event_actions';
import TaskForm from './form';

class UpdateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: EventStore.getByTypeAndId('tasks', this.props.params.taskId)
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState({
      task: EventStore.getByTypeAndId('tasks', this.props.params.taskId)
    });
  }

  handleSubmit(data) {
    const content = this.state.task;
    content.title = data.title;

    EventActions.update({
      type: 'tasks',
      content
    });
  }

  render() {
    return (
      <TaskForm task={this.state.task} onTaskSubmit={this.handleSubmit.bind(this)} />
    );
  }
}

export default UpdateTask;
