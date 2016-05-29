import React from 'react';
import EventStore from '../event_store';
import EventActions from '../event_actions';
import { withRouter } from 'react-router';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Task from './task_layout';

class ShowTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: EventStore.getByTypeAndId('tasks', this.props.params.taskId)
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
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

  handleDelete(taskId) {
    EventActions.delete({
      type: 'tasks',
      id: taskId
    });
    this.props.router.push('/tasks');
  }

  handleUpdate(taskId) {
    this.props.router.push(`/tasks/update/${taskId}`);
  }

  render() {
    let taskData;
    if (this.state.task) {
      if (!this.state.task._id) {
        taskData = (
          <div className="alert alert-danger" role="alert">Task not found!</div>
          );
      } else {
        taskData = (
          <Task
            task={this.state.task}
            delete={this.handleDelete}
            update={this.handleUpdate}
          />
        );
      }
    }


    return (
      <div className='container'>
        <Row>
          <Col md="6" md-offset="3" >
            {taskData}
          </Col>
        </Row>

      </div>
    );
  }
}

export default withRouter(ShowTask);

