import React from 'react';
import TextField from 'react-md/lib/TextFields';
import SelectField from 'react-md/lib/SelectFields';
import _ from 'lodash';

import TextEditor from '../../../partials/text_editor.js';
import translate from '../../../translate.jsx';


class EventForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
      errors: {},
      lastEditTime: 0
    };

    this.props.formFields.forEach((field) => _.set(this.state.event, [field.path], field.initialValue ? field.initialValue : ''));

    this.updateValue = this.updateValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps({initialValue}) {
    if (initialValue) {
      this.setState({
        event: initialValue
      });
    }
  }

  updateValue(value, path) {
    const event = Object.assign({}, this.state.event, _.set({}, path, value));
    this.setState({
      event
    });

    if (this.props.saveToLocalStorage) {
      this.props.saveToLocalStorage(this.state.event);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let errors = false;
    if (this.props.validate) {
      errors = this.props.validate(this.state.event);
    }

    if (errors) {
      this.setState({errors});
    } else {
      this.props.handleSubmit(this.state.event);
    }
  }

  render() {
    const {strings, formFields, title} = this.props;
    return (
      <div className="form post-form">
        <form onSubmit={this.handleSubmit}>
          <legend className="title">{_.get(strings, title)}</legend>
          {formFields.map((field) => {
            let fieldElement = null;
            switch (field.type) {
              case 'TextField': {
                fieldElement = <TextField id={field.name}
                                          type={field.textType ? field.textType : "text"}
                                          label={_.get(strings, field.label)}
                                          required={field.required}
                                          value={this.state.event[field.path]}
                                          onChange={(value) => this.updateValue(value, field.path)}/>;
                break;
              }
              case 'TextEditor': {
                fieldElement = <TextEditor id={field.name}
                                           markdown={_.get(this.props.initialValue, [field.path], '')}
                                           onChange={(value) => this.updateValue(value, field.path)}/>;
                break;
              }
              case 'CategorySelect':
                const categories = _.map(field.categories, (value) => ({
                  value,
                  label: _.get(strings, [field.categoriesTranslation, value])
                }));
                fieldElement = <SelectField id={field.name}
                                            onChange={(value) => this.updateValue(value, field.path)}
                                            label={_.get(strings, field.label)}
                                            menuItems={categories}
                                            itemLabel="label"
                                            itemValue="value"
                                            value={this.state.event[field.path]}/>;
                break;
              default: {
                console.log('Incorrect type');
              }
            }
            return <div key={field.name}>
              <label className={"label "}>{_.get(strings, field.label)}</label>
              {fieldElement}
            </div>
          })}
          <button type="submit" className="submit-btn">{strings.events.submit}</button>
        </form>
      </div>
    );
  }
}

export default translate(EventForm);

