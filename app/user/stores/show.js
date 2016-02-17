import alt from '../../alt';
import UserActions from '../actions/show';

class ShowUserStore {
  constructor() {
    this.bindActions(UserActions);
    this.user = {}
  }

  onGetUserSuccess(data) {
    this.user = data;
    //assign(this, data);
  }

  onGetPostFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

}

export default alt.createStore(ShowUserStore);