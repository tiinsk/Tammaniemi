import alt from '../alt';
import UserSource from './user_source';

class UserActions {
  constructor() {
    this.generateActions(
      'fetchAllSuccess',
      'fetchAllFail',
      'fetchOneSuccess',
      'fetchOneFail',
      'newSuccess',
      'newFail',
      'updateSuccess',
      'updateFail',
      'deleteSuccess',
      'deleteFail'
    );
  }

  delete(id) {
    UserSource.delete(id);
  }

  create(user) {
    UserSource.new(user);
  }

  update(user) {
    UserSource.update(user);
  }
}

export default alt.createActions(UserActions);
