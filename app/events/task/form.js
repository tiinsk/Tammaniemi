import React from 'react';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.task,
      titleError: '',
      errorMessage: '',
      titleValidationState: ''
    }
  }

  updateTitle(event) {
    let task = this.state.task;
    task.title = event.target.value;
    this.setState({
      task: task,
      titleValidationState: '',
      titleError: '',
    });
  }

  updateCategory(event) {
    let task = this.state.task;
    console.log("updateCategory:", event.target.value);
    task.category = event.target.value;
    this.setState({
      task: task
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

  componentWillReceiveProps (newProps) {
    this.setState(newProps.task);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.task);
    if (this.state.task.title) {
      this.props.onTaskSubmit(this.state.task);
    }
    else{
      this.invalidData(this.state.task);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Task</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <CategorySelect value={this.state.task.category}onCategoryChange={this.updateCategory.bind(this)} ></CategorySelect>
                  <div className={'form-group ' + this.state.titleValidationState}>
                    <label className='control-label'>Title</label>
                    <input type='text' className='form-control' value={this.state.task.title}
                           onChange={this.updateTitle.bind(this)} autoFocus/>
                    <span className='help-block'>{this.state.titleError}</span>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

class CategorySelect extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        categories: [
          "Ostos",
          "Ruokaostos",
          "Korjaustyö",
          "Maisemointi",
          "Muu"
          ]
      }
    }
    render() {
      var categories = this.state.categories.map((category, index) => {
        return(
          <option key={index} value={index}> {category}</option> )
      })
      return (
          <select onChange={this.props.onCategoryChange}>{categories}</select>
        )
    }
};

export default TaskForm;
