import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fi from './i18n/fi.js';

const translate = (Component) => class extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Component {...this.props} strings={fi}/>
    )
  };
};

export default translate;
