import alt from '../../alt';
import history from '../../history';

class InfoPostActions {
  constructor() {
    this.generateActions(
      'getInfoPostsSuccess',
      'getInfoPostsFail',
      'getInfoPostSuccess',
      'getInfoPostFail',
      'deleteInfoPostSuccess',
      'deleteInfoPostFail',
      'setEmptyInfoPost'
    );
  }

  getInfoPosts(payload) {
    $.ajax({ url: '/api/infoposts'})
      .done((data) => {
        this.getInfoPostsSuccess(data);
      })
      .fail((jqXhr) => {
        this.getInfoPostsFail(jqXhr.responseJSON.message);
      });
      return true;
  }

  getInfoPost(infopostId) {
    $.ajax({ url: '/api/infoposts/' + infopostId })
      .done((data) => {
        this.getInfoPostSuccess(data);
      })
      .fail((jqXhr) => {
        this.getInfoPostFail(jqXhr.responseJSON.message);
      });
      return true;
  }

  addInfoPost(infopost, jwt) {
    $.ajax({
          type: 'POST',
          url: '/api/infoposts',
          headers: {Authorization: 'JWT ' + jwt},
          data: { title: infopost.title, content: infopost.content, category: infopost.category}
        })
        .done((data) => {
          toastr.success("Message created successfully!");
          history.pushState(null, '/infoposts/' +data.id);
        })
        .fail((jqXhr) => {
         toastr.error(jqXhr.responseJSON.message);
        });
        return true;
  }

  updateInfoPost(infopostId, title, content, category, jwt) {
    $.ajax({
      type: 'PUT',
      url: '/api/infoposts/' + infopostId ,
      headers: {Authorization: 'JWT ' + jwt},
      data: { title: title, content: content, category: category}
    })
      .done((data) => {
        toastr.success("Message updated successfully!");
        history.pushState(null, '/infoposts/' + infopostId);
      })
      .fail((jqXhr) => {
        toastr.error(jqXhr.responseJSON.message);
      });
      return true;
  }

  deleteInfoPost(infopostId, jwt) {
    $.ajax({
      type: 'DELETE',
      url: '/api/infoposts/' + infopostId ,
      headers: {Authorization: 'JWT ' + jwt}
    })
      .done((data) => {
        console.log('done');
        this.deleteInfoPostSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('fail');
        this.deleteInfoPostFail(jqXhr.responseJSON.message);
      });
      return true;
  }
}

export default alt.createActions(InfoPostActions);