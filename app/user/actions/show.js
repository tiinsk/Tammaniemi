import alt from '../../alt';

class ShowUserActions {
  constructor() {
    this.generateActions(
      'getUserSuccess',
      'getUserFail'
    );
  }

  getUser(userId) {
    $.ajax({ url: '/api/users/' + userId })
      .done((data) => {
        this.actions.getUserSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getUserFail(jqXhr);
      });
  }
}

export default alt.createActions(ShowUserActions);