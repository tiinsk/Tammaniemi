import alt from '../../alt';

class AddUserActions {
  constructor() {
    this.generateActions(
      'addUserSuccess',
      'addUserFail',
      'updateName',
      'updateEmail',
      'updatePassword',
      'invalidName',
      'invalidEmail',
      'invalidPassword'
    );
  }

  addUser(name, email, password) {
    $.ajax({
      type: 'POST',
      url: '/api/users',
      data: { name: name, email: email, password: password }
    })
      .done((data) => {
        this.addUserSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.addUserFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddUserActions);