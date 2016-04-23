import React from 'react';
import UserStore from '../user_store';

class ShowUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserStore.getUserById(this.props.params.userId)
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      user: UserStore.getUserById(this.props.params.userId)
    });
  }

  render() {
    return (
      <div className="container">
          <h2><strong>{this.state.user.name}</strong></h2>
          <h4 className="lead">{this.state.user.email}</h4>
          <h4 className="lead">{this.state.user.password}</h4>
      </div>
    );
  }
}

export default ShowUser;
