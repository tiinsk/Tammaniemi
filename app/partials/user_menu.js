import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { logoutUser } from '../actions/login_actions';

class UserMenu extends React.Component{
  constructor(props) {
    super(props);
  }


  logout(){
    this.props.logoutUser().then(() => {
      browserHistory.push('/');
    })
  }

  render() {
    return (
      <div >
        <span className="user-logo"> {this.props.auth.user.name}</span>
        <span className="btn" onClick={() => this.logout()} >
          Logout
        </span>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logoutUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
