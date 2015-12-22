import alt from '../../alt';
import UserActions from '../actions/add';

class AddUserStore {
  constructor() {
    this.bindActions(UserActions);
    this.name = '';
    this.email = '';
    this.password = '';
    this.helpBlock = '';
    this.nameValidationState = '';
    this.emailValidationState = '';
    this.passwordValidationState = '';
  }

  onAddUserSuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddUserFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
    this.emailValidationState = '';
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
    this.passwordValidationState = '';
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter name.';
  }

  onInvalidEmail() {
    this.emailValidationState = 'has-error';
    this.helpBlock = 'Please enter email.';
  }

  onInvalidPassword() {
    this.passwordValidationState = 'has-error';
    this.helpBlock = 'Please enter password.';
  }
}

export default alt.createStore(AddUserStore);