import alt from '../../alt';
import PostActions from './post_actions';
import history from '../../history';

class PostStore {
  constructor() {
    console.log("PostStoreConstructor");
    this.bindActions(PostActions);
    this.post = {};
    this.posts = [];
  }

  setEmptyPost(){
    this.setState(
      {post: {
        _id: undefined,
        title: undefined,
        content: undefined,
      }});
  }

// GET ONE POST
  onGetPostSuccess(post) {
    this.setState({
      post
    });
  }

  onGetPostFail(message) {
    toastr.error(message);
  }

//GET ALL POSTS
  onGetPostsSuccess(posts) {
    console.log("qweqweqwe");
    this.setState({
      posts
    });
  }

  onGetPostsFail(errorMessage) {
    toastr.error(errorMessage);
  }

// DELETE POST
  onDeletePostSuccess(data) {
    toastr.success("Message deleted succesfully!");
    history.pushState(null, '/');
  }

  onDeletePostFail(errorMessage) {
    toastr.error(errorMessage);
  }

  addComment(comment) {
    this.posts.forEach((post) => {
      if(post._id === comment.eventId) {
        post.comments.push(comment);
      }
    })
  }
}


export default alt.createStore(PostStore);
