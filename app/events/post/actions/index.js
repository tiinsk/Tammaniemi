import alt from '../../../alt';

class IndexPostsActions {
  constructor() {
    this.generateActions(
      'getPostsSuccess',
      'getPostsFail'
    );
  }

  getPosts(payload) {
    $.ajax({ url: '/api/posts'})
      .done((data) => {
        this.actions.getPostsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getPostsFail(jqXhr);
      });
  }


}

export default alt.createActions(IndexPostsActions);