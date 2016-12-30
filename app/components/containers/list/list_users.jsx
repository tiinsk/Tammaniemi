import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../../actions/user_actions';
import User from '../user.jsx';


import LoadingAnimation from '../../presentational/loading_animation.jsx';

class UserList extends React.Component {
  constructor(props){
    super(props);
    this.props.fetchUsers();
  }



  render(){
    if(this.props.loading){
      return(
        <LoadingAnimation />
      )
    }

    let userElements = this.props.users.map((user, index) => {
      return (
        <User key={index} user={user} />
      );
    });

    return (
      <div className="container">
        <div className="app-row-only">
          <div className="col-main-only">
            {userElements}
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps({users}) {
  return {
    loading: users.loading,
    users: users.users
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchUsers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

