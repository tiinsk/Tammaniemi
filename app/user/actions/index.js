import alt from '../../alt';

class IndexUsersActions {
  constructor() {
    this.generateActions(
      'getUsersSuccess',
      'getUsersFail'
    );
  }

  getUsers(payload) {
    $.ajax({ url: '/api/users/'})
      .done((data) => {
        this.getUsersSuccess(data);
      })
      .fail((jqXhr) => {
        this.getUsersFail(jqXhr);
      });
  }
}

export default alt.createActions(IndexUsersActions);