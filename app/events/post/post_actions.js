import alt from '../../alt';
import history from '../../history';

class PostActions {
  constructor() {
    this.generateActions(
      'getPostsSuccess',
      'getPostsFail',
      'getPostSuccess',
      'getPostFail',
      'deletePostSuccess',
      'deletePostFail',
      'setEmptyPost'
    );
  }

  getPosts(payload) {
    $.ajax({ url: '/api/posts'})
      .done((data) => {
        this.getPostsSuccess(data);
      })
      .fail((jqXhr) => {
        this.getPostsFail(jqXhr.responseJSON.message);
      });
      return true;
  }

  getPost(postId) {
    $.ajax({ url: '/api/posts/' + postId })
      .done((data) => {
        this.getPostSuccess(data);
      })
      .fail((jqXhr) => {
        this.getPostFail(jqXhr.responseJSON.message);
      });
      return true;
  }

  addPost(post, jwt) {
    $.ajax({
          type: 'POST',
          url: '/api/posts',
          headers: {Authorization: 'JWT ' + jwt},
          data: { title: post.title, content: post.content}
        })
        .done((data) => {
          toastr.success("Message created successfully!");
          history.pushState(null, '/posts/' +data.id);
        })
        .fail((jqXhr) => {
         toastr.error(jqXhr.responseJSON.message);
        });
        return true;
  }

  updatePost(postId, title, content, jwt) {
    $.ajax({
      type: 'PUT',
      url: '/api/posts/' + postId ,
      headers: {Authorization: 'JWT ' + jwt},
      data: { title: title, content: content}
    })
      .done((data) => {
        toastr.success("Message updated successfully!");
        history.pushState(null, '/posts/' + postId);
      })
      .fail((jqXhr) => {
        toastr.error(jqXhr.responseJSON.message);
      });
      return true;
  }

  deletePost(postId, jwt) {
    $.ajax({
      type: 'DELETE',
      url: '/api/posts/' + postId ,
      headers: {Authorization: 'JWT ' + jwt}
    })
      .done((data) => {
        console.log('done');
        this.deletePostSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('fail');
        this.deletePostFail(jqXhr.responseJSON.message);
      });
      return true;
  }
}

export default alt.createActions(PostActions);