import alt from '../../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'loginUserSuccess',
      'loginUserFail',
      'updateEmail',
      'updatePassword'
    );
  }

  loginUser(email, password) {
    $.ajax({
      type: 'POST',
      url: '/api/sessions',
      data: { email: email, password: password }
    })
      .done((data) => {
        localStorage.setItem('jwt', data.token);
        this.loginUserSuccess(data.token);
      })
      .fail((jqXhr) => {
        this.loginUserFail(jqXhr.responseJSON.message);
      });
  }

}

export default alt.createActions(LoginActions);