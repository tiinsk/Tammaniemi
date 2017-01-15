import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {create} from '../../actions/user_actions.js'
import {LoginContainer} from './login.jsx';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    const jwtToken = this.props.params.token;
    const jwtPayload = JSON.parse(window.atob(jwtToken.split('.')[1]));

    this.state = {
      user: {
        name: '',
        email: jwtPayload.email,
        password: '',
        verifyPassword: ''
      },
      secret: this.props.params.token,
      passwordError: ''
    };
  }

  updateName(event) {
    const user = this.state.user;
    user.name = event.target.value.trim();
    this.setState({
      user
    });
  }

  updatePassword(event) {
    const user = this.state.user;
    user.password = event.target.value;
    this.setState({
      user,
      passwordError: ''
    });
  }

  updateVerifyPassword(event) {
    const user = this.state.user;
    user.verifyPassword = event.target.value;
    this.setState({
      user,
      passwordError: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = this.state.user.name;
    const email = this.state.user.email;
    const password = this.state.user.password;
    const verifyPassword = this.state.user.verifyPassword;
    const token = this.state.secret;

    if (verifyPassword !== password) {
      this.setState({
        passwordError: "Passwords doesn't match!"
      });
    }

    if (name && email && password && verifyPassword) {
      this.props.create({
        user: {
          name,
          email,
          password
        },
        token
      });
      console.log({
        name,
        email,
        password
      });
    }
  }

  render() {
    return (
      <LoginContainer >
        <input className="login-form-input"
               placeholder="Name"
               type="text"
               value={ this.state.user.name }
               required
               onChange={ this.updateName.bind(this) }/>
        <input className="login-form-input"
               placeholder="Email"
               type="email"
               value={ this.state.user.email }
               required
               disabled/>
        <input className="login-form-input"
               placeholder="Password"
               type="password"
               value={ this.state.user.password }
               required
               onChange={ this.updatePassword.bind(this) }/>
        <input className="login-form-input"
               placeholder="Verify password"
               type="password"
               value={ this.state.user.verifypassword }
               required
               onChange={ this.updateVerifyPassword.bind(this) }/>
        <button className="login-btn"
                type="submit"
                onClick={this.handleSubmit.bind(this)}>
          Create user
        </button>
      </LoginContainer>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    create
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
