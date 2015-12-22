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
        console.log('done');
        this.actions.addUserSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('fail');
        this.actions.addUserFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddUserActions);