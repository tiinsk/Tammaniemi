import React from 'react';
import Textfield from 'react-mdl/lib/Textfield';
import { SelectField, Option } from 'react-mdl-extra';
import _ from 'lodash';
import translate from '../../../translate.jsx';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        title: '',
        category: ''
      },
      titleError: '',
      errorMessage: '',
      titleValidationState: ''
    }

    this.updateTitle = this.updateTitle.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps({event}) {
    this.setState({ task: event });
  }

  updateTitle(event) {
    let task = this.state.task;
    task.title = event.target.value;
    this.setState({
      task,
      titleValidationState: '',
      titleError: '',
    });
  }

  updateCategory(category) {
    let task = this.state.task;
    task.category = category;
    this.setState({
      task
    });
  }

  invalidData(task) {
    let titleError = task.title ? '' : 'Please enter title!';

    let titleValidationState = task.title ? 'has-success' : 'has-error';
    this.setState({
      titleError: titleError,
      titleValidationState: titleValidationState
    });

  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.task.title) {
      this.state.task.__t = this.state.task.__t || 'Task';
      this.props.handleSubmit(this.state.task);
    }
    else {
      this.invalidData(this.state.task);
    }
  }

  render() {
    return (
      <div className="form task-form">
          <form onSubmit={this.handleSubmit}>
            <legend className="title">{this.props.strings.taskForm.addTask}</legend>
            <CategorySelect value={this.state.task.category} onChange={this.updateCategory} />
            <Textfield label={this.props.strings.events.title} type="text" required={true} value={this.state.task.title} onChange={this.updateTitle} />
            <button type="submit" className="submit-btn">{this.props.strings.events.submit}</button>
          </form>
      </div>
    );
  }
};

const CategorySelect = translate(({strings, value, onChange}) => {
  const categories = strings.taskCategories;

  const categoryOptions = _.map(categories, (category, index) => (
    <Option className="index" key={index} value={index}>
      {category}
    </Option>)
  );

  return (
    <SelectField label="Category" onChange={onChange} value={value}>
      {categoryOptions}
    </SelectField>
  );
});


export default translate(TaskForm);
