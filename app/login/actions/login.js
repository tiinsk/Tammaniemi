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
        console.log('done');
        console.log(data);
        localStorage.setItem('jwt', data.token);
        this.actions.loginUserSuccess(data.token);
      })
      .fail((jqXhr) => {
        console.log('fail');
        this.actions.loginUserFail(jqXhr.responseJSON.message);
      });
  }

}

export default alt.createActions(LoginActions);