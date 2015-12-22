import alt from '../../alt';
import UserActions from '../actions/index';

class IndexUsersStore {
  constructor() {
    this.bindActions(UserActions);
    this.users = [];
  }

  onGetUsersSuccess(data) {
    this.users = data;
  }

  onGetUsersFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(IndexUsersStore);