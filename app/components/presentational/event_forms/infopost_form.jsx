import React from 'react';
import TextField from 'react-md/lib/TextFields';
import _ from 'lodash';
import SelectField from 'react-md/lib/SelectFields';

import TextEditor from '../../../partials/text_editor';
import translate from '../../../translate.jsx';

class InfoPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infopost: {
        title: this.props.event ? this.props.event.title : '',
        content: this.props.event ? this.props.event.content : '',
        category: this.props.event ? this.props.event.category : 1
      },
      contentError: '',
      lastEditTime: 0
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps({event}) {
    this.setState({infopost: event});
  }

  updateTitle(value) {
    let infopost = this.state.infopost;
    infopost.title = value;
    this.setState({
      infopost
    });
    this.saveToLocalStorage();
  }

  updateContent(markdown) {
    let infopost = this.state.infopost;
    infopost.content = markdown;
    this.setState({
      infopost,
      contentError: ''
    });
    this.saveToLocalStorage();
  }

  updateCategory(category) {
    let infopost = this.state.infopost;
    infopost.category = category;
    this.setState({
      infopost
    });
    this.saveToLocalStorage();
  }

  saveToLocalStorage(){
    const newEditTime = Date.now();
    if(newEditTime - this.state.lastEditTime > 10*1000){
      localStorage.setItem('infopost', JSON.stringify(this.state.infopost));
      this.setState({
        lastEditTime: newEditTime
      });
    }
  }

  invalidData(infopost) {
    let contentError = infopost.content ? '' : 'Please enter content!';
    this.setState({
      contentError: contentError
    });

  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.infopost.title && this.state.infopost.content) {
      this.state.infopost.__t = this.state.infopost.__t || 'InfoPost';
      this.props.handleSubmit(this.state.infopost);
    }
    else {
      this.invalidData(this.state.infopost);
    }
  }

  render() {
    return (
      <div className="form infopost-form">
        <form onSubmit={this.handleSubmit}>
          <legend className="title">{this.props.strings.infopostForm.addInfopost}</legend>
          <CategorySelect value={this.state.infopost.category} onChange={this.updateCategory}/>
          <TextField id={"title"} label={this.props.strings.events.title} type="text" required={true}
                     value={this.state.infopost.title} onChange={this.updateTitle}/>
          <div className="content">
            <label
              className={"label " + (this.state.contentError != "" ? "error" : "")}>{this.props.strings.events.content}</label>
            <span className="error-message">{this.state.contentError}</span>
            <TextEditor markdown={this.state.infopost.content} onChange={this.updateContent}/>
          </div>
          <button type="submit" className="submit-btn">{this.props.strings.events.submit}</button>
        </form>
      </div>
    );
  }
}
;

const CategorySelect = translate(({strings, value, onChange}) => {
  const categories = _.map(strings.infopostCategories, (value, key) => ({
    value: key,
    label: value
  }));

  return (
    <SelectField id={"CategorySelect"}
                 onChange={onChange}
                 label="Category"
                 menuItems={categories}
                 itemLabel="label"
                 itemValue="value"
                 value={value}/>
  );
});

export default translate(InfoPostForm);
