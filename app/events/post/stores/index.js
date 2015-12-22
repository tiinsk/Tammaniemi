import alt from '../../../alt';
import PostActions from '../actions/index';

class IndexPostsStore {
  constructor() {
    this.bindActions(PostActions);
    this.posts = [];
  }

  onGetPostsSuccess(data) {
    this.posts = data;
  }

  onGetPostsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(IndexPostsStore);