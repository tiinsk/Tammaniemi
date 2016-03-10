import React from 'react';
import TaskForm from './form';
import EventActions from '../event_actions';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        category: 0
      }
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(task) {
    console.log(task);
    EventActions.create({
      type: 'tasks',
      content: task
    });
  }

  render() {
    return (
      <Row>
          <Col md="8" md-offset="2" >
            <TaskForm task={this.state.task} onTaskSubmit={this.handleSubmit.bind(this)} />
          </Col>
        </Row>

    );
  }
}

export default AddTask;
