import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from 'react-md/lib/TextFields';
import {update} from '../../actions/user_actions';
import translate from '../../translate.jsx';


class UserUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.validatePasswords = this.validatePasswords.bind(this);
    const defaultUser = {
      name: '',
      newPassword: '',
      verifyPassword: '',
      oldPassword: '',
      email: '',
    };
    this.state = {
      user: Object.assign({}, defaultUser, this.props.user),
      passwordError: {
        status: false,
        message: ''
      }
    };
  }

  validatePasswords() {
    if (this.state.user.newPassword && this.state.user.verifyPassword && this.state.user.newPassword !== this.state.user.verifyPassword) {
      this.setState({passwordError: {status: true, message: 'Salasanat eivät täsmää'}});
      return false;
    }
    this.setState({passwordError: {status: false, message: ''}});
    return true;
  }

  handleSubmit() {
    event.preventDefault();
    if (this.validatePasswords()) {
      this.props.update(this.state.user);
    }
  }

  onValueChange(path, value) {
    const user = Object.assign({}, this.state.user, {[path]: value});
    this.setState({user}, this.validatePasswords);
  }

  render() {
    const {user} = this.state;
    const {strings: translationStrings} = this.props;

    return (
      <div className="row center">
        <div className="create-main-only">
          <div className="form user-form">
            <form>
              <legend className="title">{this.props.strings.userForm.title}</legend>
              <TextField id="name"
                         type="text"
                         label={translationStrings.userForm.name}
                         value={user.name}
                         onChange={(value) => this.onValueChange('name', value)}/>
              <TextField id="email"
                         type="text"
                         label={translationStrings.userForm.email}
                         defaultValue={user.email}
                         disabled/>
              <TextField id="password"
                         type="password"
                         label={translationStrings.userForm.newPassword}
                         value={user.newPassword}
                         onChange={(value) => this.onValueChange('newPassword', value)}
                         error={this.state.passwordError.status}
                         errorText={this.state.passwordError.message}/>
              <TextField id="verifyPassword"
                         type="password"
                         label={translationStrings.userForm.verifyPassword}
                         value={user.verifyPassword}
                         onChange={(value) => this.onValueChange('verifyPassword', value)}
                         error={this.state.passwordError.status}
                         errorText={this.state.passwordError.message}/>
              <TextField id="oldPassword"
                         type="password"
                         label={translationStrings.userForm.oldPassword}
                         value={user.oldPassword}
                         onChange={(value) => this.onValueChange('oldPassword', value)}/>
              <button type="button"
                      className="submit-btn"
                      onClick={() => this.handleSubmit()}>{this.props.strings.events.submit}</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({auth}) {
  return {
    user: auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({update}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(UserUpdate));
