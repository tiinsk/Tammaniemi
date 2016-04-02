import axios from 'axios';

import alt from '../alt';
import LoginActions from './login_actions';

class LoginStore {

  constructor() {
    // First we register to the Dispatcher to listen for actions.
    this.bindActions(LoginActions);

    this.user = {};
    this.errorMessage = '';
    this.isLoggedIn = false;

    this.userPromise = axios
    .get('/api/account')
    .then((response) => {
      this.setState({
        user: response.data,
        isLoggedIn: true
      });
    });
  }

  onLoginUserSuccess(user) {
    this.setState({
      user,
      isLoggedIn: true,
      userPromise: Promise.resolve(user)
    });
  }

  onLoginUserFail(errorMessage) {
    this.setState({
      errorMessage
    });
  }

  onLogoutUserSuccess() {
    this.setState({
      user: {},
      isLoggedIn: false,
      userPromise: Promise.reject('Not logged in')
    });
  }

  onLogoutUserFail(errorMessage) {
    this.setState({
      errorMessage
    });
  }
}

export default alt.createStore(LoginStore);
