import React from 'react';

class InfoPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infopost: props.infopost,
      titleError: '',
      contentError: '',
      errorMessage: '',
      titleValidationState: '',
      contentValidationState: '',
    }
  }

  updateTitle(event) {
    let infopost = this.state.infopost;
    infopost.title = event.target.value;
    this.setState({
      infopost: infopost,
      titleValidationState: '',
      titleError: '',
    });
  }

  updateContent(event) {
    let infopost = this.state.infopost;
    infopost.content = event.target.value;
    this.setState({
      infopost: infopost,
      titleValidationState: '',
      titleError: '',
    });
  }

  updateCategory(event) {
    let infopost = this.state.infopost;
    console.log("updateCategory:", event.target.value);
    infopost.category = event.target.value;
    this.setState({
      infopost: infopost
    });
  }

  invalidData(infopost) {
    let titleError = infopost.title ? '' : 'Please enter title!';
    let contentError = infopost.content ? '' : 'Please enter content!';

    let titleValidationState = infopost.title ? 'has-success' : 'has-error';
    let contentValidationState = infopost.content ? 'has-success' : 'has-error';
    this.setState({
      titleError: titleError, 
      contentError: contentError,
      titleValidationState: titleValidationState, 
      contentValidationState: contentValidationState
    });

  }

  componentWillReceiveProps (newProps) {
    this.setState(newProps.infopost);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.infopost);
    if (this.state.infopost.title && this.state.infopost.content) {
      this.props.onInfoPostSubmit(this.state.infopost);
    }
    else{
      this.invalidData(this.state.infopost);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>InfoPost</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <CategorySelect value={this.state.infopost.category}onCategoryChange={this.updateCategory.bind(this)} ></CategorySelect>
                  <div className={'form-group ' + this.state.titleValidationState}>
                    <label className='control-label'>Title</label>
                    <input type='text' className='form-control' value={this.state.infopost.title}
                           onChange={this.updateTitle.bind(this)} autoFocus/>
                    <span className='help-block'>{this.state.titleError}</span>
                  </div>
                  <div className={'form-group ' + this.state.contentValidationState}>
                    <label className='control-label'>Content</label>
                    <input type='text' className='form-control' value={this.state.infopost.content}
                           onChange={this.updateContent.bind(this)} autoFocus/>
                    <span className='help-block'>{this.state.contentError}</span>
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
          "Yleistä",  
          "Kevät- ja syystyöt", 
          "Kunnossapito",
          "Piha", 
          "Sauna", 
          "Sähkö",
          "Tärkeät yhteystiedot",
          "Vene ja vesistö",
          "Vesi",
          "WC ja jätteet"
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

export default InfoPostForm;