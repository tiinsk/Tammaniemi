import React from 'react';
import _ from 'lodash';
import EventActions from '../event_actions';
import EventStore from '../event_store';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import history from '../../history';

import Task_S from './task_layout_s';

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

  handleChecked(taskId){
    let updatedTask = this.state.tasks.find((task) => task._id === taskId );
    updatedTask.isDone = !updatedTask.isDone;

    EventActions.update({type: 'tasks', content: updatedTask});
  }

  getTasksByCategory(){
    const grouped = this.state.tasks.reduce((result, task) => {
      if (!result[task.category]) {
        result[task.category] = [];
      }
      result[task.category].push(
        <Task_S key={task._id}
            task={task}
            to={`/tasks/${task._id}`}
            delete={this.handleDelete}
            update={this.handleUpdate}
            toggleChecked={this.handleChecked.bind(this)}
          />
      );
      return result;
    }, {});
    return grouped;
  }

  render() {
    const grouped = this.getTasksByCategory();
    return (
      <div className="index-layout">
          <div md="6" className="header-section">
              <div className="title" > Tasks </div>
              <div className="new-task">
              <div className="symbol">
                <div className="img" ></div>
              </div>
              <div className="header"> Add new task </div>
            </div>
          </div>
        <Row>
          <Col className="column" lg="6">
            <div className="section">
              <div className="symbol symbol_buy"></div>
              <h2 className="header">To Buy</h2>
              {grouped[0]}
            </div>
            <div className="section">
              <div className="symbol symbol_fix"></div>
              <h2 className="header">Fix These</h2>
              {grouped[2]}
            </div>
            <div className="section">
              <div className="symbol symbol_other"></div>
              <h2 className="header">Others</h2>
              {grouped[4]}
            </div>
          </Col>
          <Col className="column" lg="6">
            <div className="section">
              <div className="symbol symbol_food"></div>
              <h2 className="header">Food to Buy</h2>
              {grouped[1]}
            </div>
            <div className="section">
              <div className="symbol symbol_nature"></div>
              <h2 className="header">Leafy Things</h2>
              {grouped[3]}
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

export default IndexTasks;

