import alt from '../../../alt';

class AddPostActions {
  constructor() {
    this.generateActions(
      'addPostSuccess',
      'addPostFail',
      'updateTitle',
      'updateContent',
      'invalidTitle',
      'invalidContent'

    );
  }

  addPost(title, content, jwt) {
    $.ajax({
      type: 'POST',
      url: '/api/posts',
      headers: {Authorization: 'JWT ' + jwt},
      data: { title: title, content: content}
    })
      .done((data) => {
        console.log('done');
        this.actions.addPostSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('fail');
        this.actions.addPostFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddPostActions);