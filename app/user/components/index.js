import React from 'react';
import { Link } from 'react-router';
import UserStore from '../user_store';

class IndexUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserStore.getUsers();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const userList = this.state.users.map((user) => (
        <div key={user._id}>
          <h4>
            <Link to={`/users/${user._id}`}>{user.name}</Link>
          </h4>
        </div>
      )
    );

    return (
      <div className="container">
        <div className="list-group">
          {userList}
        </div>
      </div>
    );
  }
}

export default IndexUsers;
