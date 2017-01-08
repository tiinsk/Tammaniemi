import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import {chooseLanguage} from '../../actions/login_actions';
import translate from '../../translate.jsx';
import {languageOptions} from '../../i18n/languages';

class LanguageDropDown extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false
    };
  }

  toggleOpen(){
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  }

  render() {
    return (
      <div className="language-dropdown">
        <div
          className={"language-container" + " " + (this.state.menuIsOpen ? "open" : "")}
          onClick={() => this.toggleOpen()}
        >
          <div className="chosen-language">
            {languageOptions[this.props.language]}
          </div>
          <i className="fa fa-sort-desc"></i>
        </div>
        { this.state.menuIsOpen ?
          <div className="language-list">
            {
              _.map(languageOptions, (val, key) => {
                return(
                  <div
                    key={key}
                    className="list-item"
                    onClick={() => {
                      this.props.chooseLanguage(key);
                      this.toggleOpen();
                    }}
                  >
                    {val}
                  </div>
                );
              })
            }
          </div> : null
        }
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    language: auth.language
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({chooseLanguage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(LanguageDropDown));
