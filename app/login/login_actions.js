import axios from 'axios';
import { browserHistory } from 'react-router';

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
      browserHistory.push('/home');
    });
  }

  logout() {
    axios
    .get('/api/logout')
    .then((response) => {
      this.logoutUserSuccess(response.data);
      browserHistory.push('/');
    });
  }

}

export default alt.createActions(LoginActions);
