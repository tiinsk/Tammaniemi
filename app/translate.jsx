import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getTranslations} from './i18n/languages';

const translate = (Component) => connect(mapStateToProps, null)(
  class extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
      return (
        <Component {...this.props} strings={getTranslations(this.props.language)}/>
      )
    };
});

function mapStateToProps({auth}) {
  return {
    language: auth.language
  }
}

export default translate;

