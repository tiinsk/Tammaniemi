import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import UserActions from '../user_actions';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        email: '',
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

  updateEmail(event) {
    const user = this.state.user;
    user.email = event.target.value.trim();
    this.setState({
      user
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
      UserActions.create({
        user: {
          name,
          email,
          password
        },
        token
      });
      console.log({name, email, password});
    }
  }

  render() {
    return (
      <div>
        <div id="myModal" className={"modal " + (this.state.displayModal ? "show-modal" : "") }>
          <div className="modal-content">
            <Row>
              <Col md="8" md-offset="2" >
                <Form className="form" onSubmit={this.handleSubmit.bind(this)}>
                  <legend className="title">Create new user </legend>
                  <Input label="Name" type="text" className="form-control" value={this.state.user.name} floatingLabel required
                           onChange={this.updateName.bind(this)}
                  />

                  <Input label="Email" type="email" className="form-control" value={this.state.user.email} floatingLabel required
                           onChange={this.updateEmail.bind(this)}
                  />

                  <Input label="Password" type="text" className="form-control" value={this.state.user.password} floatingLabel required
                           onChange={this.updatePassword.bind(this)}
                  />
                  <Input label="Verify password" type="text" className="form-control" value={this.state.user.verifypassword} floatingLabel required
                           onChange={this.updateVerifyPassword.bind(this)}
                  />
                  <div className="error-message">{this.state.passwordError}</div>

                  <button type="submit" className="submit-btn">Submit</button>
                </Form>
              </Col>
            </Row>

          </div>
        </div>
      </div>
    );
  }
}
