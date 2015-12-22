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
        this.actions.getUsersSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getUsersFail(jqXhr);
      });
  }
}

export default alt.createActions(IndexUsersActions);