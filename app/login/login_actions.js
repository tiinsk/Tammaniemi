import axios from 'axios';
import { withRouter } from 'react-router';

import alt from '../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'loginUserSuccess',
      'loginUserFail',
      'logoutUserSuccess',
      'logoutUserFail'
    );
  }

  loginUser(email, password) {
    axios
    .post('/api/login', {
      email,
      password
    })
    .then((response) => {
      this.loginUserSuccess(response.data);
      history.replaceState(null, '/home');
    });
  }

  logout() {
    axios
    .get('/api/logout')
    .then((response) => {
      this.logoutUserSuccess(response.data);
      history.replaceState(null, '/');
    });
  }

}

export default alt.createActions(withRouter(LoginActions));
