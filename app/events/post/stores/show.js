import alt from '../../../alt';
import PostActions from '../actions/show';

class ShowPostStore {
  constructor() {
    this.bindActions(PostActions);
    this.post = {}
  }

  onGetPostSuccess(data) {
    this.post = data;
    console.log(data);
    //assign(this, data);
  }

  onGetPostFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onDeletePostSuccess(data) {
    toastr.success("Message deleted succesfully!");
    console.log("deleted");
  }

  onDeletePostFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

}

export default alt.createStore(ShowPostStore);