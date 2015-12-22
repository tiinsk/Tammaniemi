import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import UserStore from '../stores/index';
import UserActions from '../actions/index';

class IndexUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.onChange);
    UserActions.getUsers(this.props.params);
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      UserActions.getUsers(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let userList = this.state.users.map((user, index) => {
      return (
              <div key={user._id} className=''>
                <h4>
                  <Link to={'/users/' + user._id}>{user.name}</Link>
                </h4>
              </div>
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {userList}
        </div>
      </div>
    );
  }
}

export default IndexUsers;