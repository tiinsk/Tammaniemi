import alt from '../../alt';
import InfoPostActions from './infopost_actions';
import history from '../../history';

class InfoPostStore {
  constructor() {
    console.log("InfoPostStoreConstructor");
    this.bindActions(InfoPostActions);
    this.infopost = {};
    this.infoposts = [];
  }

  setEmptyInfoPost(){
    this.setState(
      {infopost: {
        _id: undefined,
        title: undefined,
        content: undefined,
        category: 0
      }});
  }

// GET ONE POST
  onGetInfoPostSuccess(infopost) {
    this.infopost = infopost;
  }

  onGetInfoPostFail(message) {
    toastr.error(message);
  }

//GET ALL POSTS
  onGetInfoPostsSuccess(infopost) {
    this.infoposts = infopost;
  }

  onGetInfoPostsFail(errorMessage) {
    toastr.error(errorMessage);
  }

// DELETE POST
  onDeleteInfoPostSuccess(data) {
    toastr.success("Message deleted succesfully!");
    history.pushState(null, '/');
  }

  onDeleteInfoPostFail(errorMessage) {
    toastr.error(errorMessage);
  }

}


export default alt.createStore(InfoPostStore);