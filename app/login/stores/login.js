import alt from '../../alt';
import LoginActions from '../actions/login';

class LoginStore{

  constructor() {
    // First we register to the Dispatcher to listen for actions.
    this.bindActions(LoginActions);

    this.jwt = window.localStorage && window.localStorage.jwt || null;
    this.user = this.decodeTokenPayload(this.jwt);

    this.email = this.user.email || '';
    this.password = '';
    this.errorMessage = '';
    this.isLoggedIn = false;
  }

  decodeTokenPayload(token) {
     var user = {};
     if (token) {
         var encoded = token.split('.')[0];
         encoded = token.split('.')[1];
         user = JSON.parse(window.atob(encoded));
     }
     return user;
  }


  onLoginUserSuccess(data) {

    this.jwt = data;
    console.log("JWT:" + this.jwt);
    // Then we decode it to get the user information.
    this.user = this.decodeTokenPayload(this.jwt);
    this.isLoggedIn = true;

  }
  onLoginUserFail(errorMessage){
    this.errorMessage = errorMessage;
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }


}
export default alt.createStore(LoginStore);