import React from 'react';
import {Link} from 'react-router';
import { withRouter } from 'react-router';
import EventActions from '../event_actions';
import EventStore from '../event_store';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';

import Task_S from './task_layout_s';

import NavigationBox from './navigation';

class IndexTasks extends React.Component {
  constructor(props) {
    super(props);
    let tasks = EventStore.getByType('tasks');
    if(tasks.length > 0){
      let organizedTasks = this.getTasksByCategory(tasks);
      let category = Object.keys(organizedTasks)[0];

      this.state = {
        tasks: organizedTasks,
        category: category,
        showDone: false,
        showUndone: true
      };
    }else{
      this.state = {
        tasks: [],
        category: undefined,
        showDone: false,
        showUndone: true
      };
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange(state) {
    let tasks = state.tasks;
    let organizedTasks = this.getTasksByCategory(tasks);
    let category = Object.keys(organizedTasks)[0];

    this.setState({
      tasks: organizedTasks,
      category: category
    });

  }

  handleDelete(taskId) {
    EventActions.delete({
      type: 'tasks',
      id: taskId
    });
  }

  handleUpdate(taskId) {
    this.props.router.push(`/tasks/update/${taskId}`);
  }

  handleChecked(taskId){
    let updatedTask = this.state.tasks[this.state.category].find((task) => task._id === taskId );
    updatedTask.isDone = !updatedTask.isDone;

    EventActions.update({type: 'tasks', content: updatedTask});
  }

/*  getTasksByCategory(){
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
  }*/
  update(category){
    this.setState({
      category: category
    });
  }

  getTasksByCategory(tasks){
    return tasks.reduce((result, task) => {
      let category = task.category;
      if (!result[category]) {
        result[category] = [];
      }
      result[task.category].push(task);
      return result;
    }, {});
  }

  goTo(link) {
    history.pushState(null, link);
  }

  toggleDoneShow(){
    console.log("toggleDoneShow");
    this.setState({
      showDone: !this.state.showDone
    });
  }

  toggleUndoneShow(){
    console.log("toggleUndoneShow");
    this.setState({
      showUndone: !this.state.showUndone
    });
  }

  render() {
  let selectedTasks;
    if (this.state.category != undefined) {
      let tasks = this.state.tasks[this.state.category].filter((task) => {
        if(this.state.showDone && task.isDone){
          return true;
        }
        if(this.state.showUndone && !task.isDone){
          return true;
        }
        return false;
      });
      selectedTasks =  tasks.map((task, index) => {
        return(
          <Task_S key={task._id}
            task={task}
            to={`/tasks/${task._id}`}
            delete={this.handleDelete}
            update={this.handleUpdate}
            toggleChecked={this.handleChecked.bind(this)}
          />
        );
      });
      if(selectedTasks.length == 0){
        selectedTasks = (
          <div className="no-tasks">
            No tasks to show
          </div>
        );
      }
    };

    const categories = [
          "To Buy",
          "Food to Buy",
          "To Fix",
          "Outdoor Tasks",
          "Others"
          ];

    const categoryObjects = categories.map((category, index) => {
      let obj = {header: category };
      if(this.state.tasks[index]){
        if(this.state.showDone){
          obj.doneAmount = this.state.tasks[index].filter( task => task.isDone ).length;
        }
        if(this.state.showUndone){
          obj.undoneAmount = this.state.tasks[index].filter( task => !task.isDone ).length;
        }
      }else{
       obj.doneAmount = 0;
       obj.undoneAmount = 0;
      }
      return obj;
    });

    return (
      <div className='container'>
        <div className="page-title">
          Tasks
          <div className="add-new" onClick={this.goTo.bind(this, "/tasks/new")}>
            <span>+</span>
          </div>
        </div>
        <div className="app-row-center">
        <div className="col-left">
            <NavigationBox
              update={this.update.bind(this)}
              chosenCategory={this.state.category}
              categories={categoryObjects}
            />
            <OptionMenu
              showDone={this.state.showDone}
              showUndone={this.state.showUndone}
              onShowDoneChange={ () => this.toggleDoneShow()}
              onShowUndoneChange={ () => this.toggleUndoneShow()}
            />
          </div>
          <div className="col-main">
            {selectedTasks}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(IndexTasks);

const OptionMenu = ({showUndone, showDone, onShowUndoneChange, onShowDoneChange}) => {
  return(
    <div className="option-menu">
      <Option
        title="Show Undone"
        selected={showUndone}
        onSelectedChange={onShowUndoneChange}
      />
      <Option
        title="Show Done"
        selected={showDone}
        onSelectedChange={onShowDoneChange}
      />
    </div>
  );
}

const Option = ({title, selected, onSelectedChange}) => {
  return(
    <div className="option" onClick={onSelectedChange} >
      <div className={"checkbox" + (selected ? " selected" : "" )}>
        <div className={"mark" + (selected ? " selected" : "" )}></div>
      </div>
      <div className="title">{title}</div>
    </div>
  );
}
