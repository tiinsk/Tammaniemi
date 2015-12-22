import React from 'react';
import UserStore from '../stores/add';
import UserActions from '../actions/add';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserStore.getState();
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

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var email = this.state.email.trim();
    var password = this.state.password;

    if (!name) {
      UserActions.invalidName();
      this.refs.nameTextField.getDOMNode().focus();
    }

    if (!email) {
      UserActions.invalidEmail();
    }

    if (!password) {
      UserActions.invalidPassword();
    }

    if (name && email && password) {
      UserActions.addUser(name, email, password);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add User</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>Name</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                           onChange={UserActions.updateName} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.emailValidationState}>
                    <label className='control-label'>Email</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.email}
                           onChange={UserActions.updateEmail} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.passwordValidationState}>
                    <label className='control-label'>Password</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.password}
                           onChange={UserActions.updatePassword} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>

                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUser;