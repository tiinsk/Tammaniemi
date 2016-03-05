import alt from '../alt';
import history from './../history';

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
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: {
        email,
        password
      }
    })
    .done((data) => {
      this.loginUserSuccess(data);
      history.replaceState(null, '/');
    })
    .fail((jqXhr) => {
      this.loginUserFail(jqXhr.responseJSON.message);
    });
  }

  logout() {
    $.ajax({
      url: '/api/logout'
    })
    .done((data) => {
      this.logoutUserSuccess(data);
      history.replaceState(null, '/');
    })
    .fail((jqXhr) => {
      this.logoutUserFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(LoginActions);
