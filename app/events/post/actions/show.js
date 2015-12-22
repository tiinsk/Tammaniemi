import alt from '../../../alt';

class ShowPostActions {
  constructor() {
    this.generateActions(
      'getPostSuccess',
      'getPostFail',
      'deletePostSuccess',
      'deletePostFail'
    );
  }

  getPost(postId) {
    $.ajax({ url: '/api/posts/' + postId })
      .done((data) => {
        this.actions.getPostSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getPostFail(jqXhr);
      });
  }

  deletePost(postId, jwt) {
    $.ajax({
      type: 'DELETE',
      url: '/api/posts/' + postId ,
      headers: {Authorization: 'JWT ' + jwt}
    })
      .done((data) => {
        console.log('done');
        this.actions.deletePostSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('fail');
        this.actions.deletePostFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(ShowPostActions);