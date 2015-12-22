import alt from '../../../alt';

class UpdatePostActions {
  constructor() {
    this.generateActions(
      'getPostSuccess',
      'getPostFail',
      'updatePostSuccess',
      'updatePostFail',
      'updateTitle',
      'updateContent',
      'invalidTitle',
      'invalidContent'

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

  updatePost(postId, title, content, jwt) {
    $.ajax({
      type: 'PUT',
      url: '/api/posts/' + postId ,
      headers: {Authorization: 'JWT ' + jwt},
      data: { title: title, content: content}
    })
      .done((data) => {
        console.log('done');
        this.actions.updatePostSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('fail');
        this.actions.updatePostFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(UpdatePostActions);