import alt from '../../alt';
import PostActions from './post_actions';
import history from '../../history';

class PostStore {
  constructor() {
    this.bindActions(PostActions);
    this.post = {};
    this.setEmptyPost();
    this.posts = [];
    /*this.data = {
      title: "",
      content: ""
    }*/
    console.log("Rakentaja!!!");
  }

  setEmptyPost(){
    this.post = {
      _id: undefined,
      title: undefined,
      content: undefined,
    };
  }

// ONE POST
  onGetPostSuccess(data) {
    console.log(data);
    this.post = data;
    /*this.data = {
      title: data.title,
      content: data.content,
    };*/
  }

  onGetPostFail(message) {
    toastr.error(message);
  }

// ALL POSTS
  onGetPostsSuccess(data) {
    this.posts = data;
  }

  onGetPostsFail(errorMessage) {
    toastr.error(errorMessage);
  }

// DELETE POST
  onDeletePostSuccess(data) {
    toastr.success("Message deleted succesfully!");
    history.pushState(null, '/');
  }

  onDeletePostFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

}


export default alt.createStore(PostStore);