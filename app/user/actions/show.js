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
        this.getUserSuccess(data);
      })
      .fail((jqXhr) => {
        this.getUserFail(jqXhr);
      });
  }
}

export default alt.createActions(ShowUserActions);