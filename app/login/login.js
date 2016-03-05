import React from 'react';
import LoginStore from './login_store';
import LoginActions from './login_actions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  updateEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  login(e) {
    e.preventDefault();
    LoginActions.loginUser(this.state.email, this.state.password);
  }

  render() {
    if (this.state.isLoggedIn) {
      return <h1>Already logged in</h1>;
    }
    return (
        <form role="form">
        <div className="form-group">
          <input type="text" placeholder="Email" onChange={this.updateEmail.bind(this)}
            value={this.state.email}
          />
          <input type="password" placeholder="Password" onChange={this.updatePassword.bind(this)}
            value={this.state.password}
          />
        </div>
        <button type="submit" onClick={this.login.bind(this)}>Submit</button>
      </form>
    );
  }
}

export default Login;
