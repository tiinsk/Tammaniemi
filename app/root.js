import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  Notifications  from './components/presentational/notifications.jsx';

class Root extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          <Notifications/>
          {this.props.children}
      </div>
    );
  }
}

export default Root;
