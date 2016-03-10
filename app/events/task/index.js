import React from 'react';

import EventActions from '../event_actions';
import EventStore from '../event_store';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import history from '../../history';

import Task from './task_layout';

class IndexTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: EventStore.getByType('tasks')
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
      tasks: state.tasks
    });
  }

  handleDelete(taskId) {
    EventActions.delete({
      type: 'tasks',
      id: taskId
    });
  }

  handleUpdate(taskId) {
    history.pushState(null, `/tasks/update/${taskId}`);
  }

  render() {
    const taskList = this.state.tasks.map((task) =>
      (
        <Task key={task._id}
          task={task}
          to={`/tasks/${task._id}`}
          delete={this.handleDelete}
          update={this.handleUpdate}
        />
      )
    );

    return (
      <div className="container">
        <Row>
          <Col md="6" md-offset="3" >
            {taskList}
          </Col>
        </Row>

      </div>
    );
  }
}

export default IndexTasks;

