import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';


export default class NewUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        verifyPassword: ""
      },
      secret: "",
      secretError: "",
      passwordError: "",
      displayModal: false
    }
  }

  updateName(event) {
    let user = this.state.user;
    user.name = event.target.value.trim();
    this.setState({
      user
    });
  }
  updatePassword(event) {
    let user = this.state.user;
    user.password = event.target.value;
    this.setState({
      user,
      passwordError: ""
    });
  }
  updateVerifyPassword(event) {
    let user = this.state.user;
    user.verifyPassword = event.target.value;
    this.setState({
      user,
      passwordError: ""
    });
  }

  updateEmail(event) {
    let user = this.state.user;
    user.email = event.target.value.trim();
    this.setState({
      user
    });
  }
  updateSecret(event) {
    this.setState({
      secret: event.target.value,
      secretError: ""
    });
  }


  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.user.name;
    var email = this.state.user.email;
    var password = this.state.user.password;
    var verifyPassword = this.state.user.verifyPassword;

    if (verifyPassword !== password) {
      this.setState({
        passwordError: "Passwords doesn't match!"
      });
    }

    if(this.state.secret != "TAMMANIEMI"){
      this.setState({
        secretError: "Secret incorrect!"
      });
    }

    if (name && email && password && verifyPassword) {
      //this.props.addUser(user);
      console.log({name, email, password});
    }
  }

  openModal(){
    this.setState({
      displayModal: true
    })
  }

  closeModal(){
    this.setState({
      displayModal: false
    })
  }

  render() {
    return (
      <div className="login-modal">
        <button onClick={this.openModal.bind(this)} className="new-user-btn" id="myBtn">Not already a user?</button>

        <div id="myModal" className={"modal " + (this.state.displayModal ? "show-modal" : "") }>
          <div className="modal-content">
            <Row>
              <Col md="8" md-offset="2" >
                <Form className="form" onSubmit={this.handleSubmit.bind(this)}>
                  <legend className="title">Create new user </legend>
                  <Input label="Name" type='text' className='form-control' value={this.state.user.name} floatingLabel={true} required={true}
                           onChange={this.updateName.bind(this)}/>

                  <Input label="Email" type='email' className='form-control' value={this.state.user.email} floatingLabel={true} required={true}
                           onChange={this.updateEmail.bind(this)}/>

                  <Input label="Password" type='text' className='form-control' value={this.state.user.password} floatingLabel={true} required={true}
                           onChange={this.updatePassword.bind(this)}/>
                  <Input label="Verify password" type='text' className='form-control' value={this.state.user.verifypassword} floatingLabel={true} required={true}
                           onChange={this.updateVerifyPassword.bind(this)}/>
                  <div className='error-message'>{this.state.passwordError}</div>
                  <Input label="Secret key" type='text' className='form-control' value={this.state.secret} floatingLabel={true} required={true}
                           onChange={this.updateSecret.bind(this)}/>
                  <div className='error-message'>{this.state.secretError}</div>
                  <button type='submit' className='submit-btn'>Submit</button>
                  <button className='cancel-btn' onClick={this.closeModal.bind(this)}>Cancel</button>

                </Form>
              </Col>
            </Row>

          </div>
        </div>
      </div>
    );
  }
};

