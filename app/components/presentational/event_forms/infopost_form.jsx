import React from 'react';
import Textfield from 'react-mdl/lib/Textfield';
import _ from 'lodash';
import { SelectField, Option } from 'react-mdl-extra';

import TextEditor from '../../../partials/text_editor';
import translate from '../../../translate.jsx';

class InfoPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infopost: {
        title: '',
        content: '',
        category: 1
      },
      contentError: ''
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps({event}) {
    this.setState({ infopost: event });
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

  updateCategory(category) {
    let infopost = this.state.infopost;
    infopost.category = category;
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
          <CategorySelect value={this.state.infopost.category} onChange={this.updateCategory} />
          <Textfield label={this.props.strings.events.title} type="text" required={true} value={this.state.infopost.title} onChange={this.updateTitle} />
          <div className="content">
            <label className={"label " + (this.state.contentError != "" ? "error" : "")}>{this.props.strings.events.content}</label>
            <span className="error-message">{this.state.contentError}</span>
            <TextEditor markdown={this.state.infopost.content} onChange={this.updateContent} />
          </div>
          <button type="submit" className="submit-btn">{this.props.strings.events.submit}</button>
        </form>
      </div>
    );
  }
};

const CategorySelect = translate(({strings,value, onChange}) => {
  const categories = strings.infopostCategories;

  const categoryOptions = _.map(categories, (category, index) => (
    <Option className="index" key={index} value={index}>
      {category}
    </Option>)
  );

  return (
    <SelectField onChange={onChange} value={value} label="Category">
      {categoryOptions}
    </SelectField>
  );
});

export default translate(InfoPostForm);
