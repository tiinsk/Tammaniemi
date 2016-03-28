import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

import TextEditor from '../../partials/text_editor';


class InfoPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infopost: props.infopost,
      contentError: ''
    }
  }

  updateTitle(event) {
    let infopost = this.state.infopost;
    infopost.title = event.target.value;
    this.setState({
      infopost
    });
  }

  updateContent(markdown) {
    let infopost = this.state.infopost;
    infopost.content = markdown;
    this.setState({
      infopost,
      contentError: ''
    });
  }

  updateCategory(event) {
    let infopost = this.state.infopost;
    infopost.category = parseInt(event);
    this.setState({
      infopost
    });
  }

  invalidData(infopost) {
    let contentError = infopost.content ? '' : 'Please enter content!';
    this.setState({
      contentError: contentError
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
      <div className='form infopost-form'>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <legend className="title">Add new infopost</legend>
          <CategorySelect value={this.state.infopost.category}onCategoryChange={this.updateCategory.bind(this)} ></CategorySelect>
          <Input label="Title" floatingLabel={true} required={true} value={this.state.infopost.title} onChange={this.updateTitle.bind(this)} />
          <div className="content">
            <label className={"label " + (this.state.contentError != "" ? "error" : "")}>Content</label>
            <span className="error-message">{this.state.contentError}</span>
            <TextEditor markdown={this.state.infopost.content} onChange={this.updateContent.bind(this)} />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </Form>
      </div>
    );
  }
};

class CategorySelect extends React.Component{
    constructor(props){
      super(props);
      this.state = {

      }
    }
    render() {
      let categories = [
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
        ];
      var categoryOptions = categories.map((category, index) => {
        return(
          <Option className="index" key={index} value={index.toString()} label={category} /> )
      })
      return (
        <Select onChange={this.props.onCategoryChange} defaultValue={this.props.value.toString()}>{categoryOptions} </Select>
      );
    }
};

export default InfoPostForm;
