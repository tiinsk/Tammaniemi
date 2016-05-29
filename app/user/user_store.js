import alt from '../alt';
import UserActions from './user_actions';
import UserSource from './user_source';
import { browserHistory } from 'react-router';

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.users = [];

    this.exportPublicMethods({
      getUsers: this.getUsers,
      getUserById: this.getUserById
    });
  }

  onFetchAllSuccess({ users }) {
    this.setState({
      users
    });
  }

  onFetchAllFail() {
  }

  onFetchOneSuccess({ user }) {
    const index = this.users.findIndex((u) =>
      u._id === user._id
    );
    if (index !== -1) {
      this.users[index] = user;
      return;
    }
    this.users.push(user);
  }

  onFetchOneFail() {
  }

  onNewSuccess({ created }) {
    this.users.push(created);
    browserHistory.push(`/users/${created._id}`);
  }

  onNewFail() {
  }

  onUpdateSuccess() {
    browserHistory.push('/users');
  }

  onUpdateFail() {
  }

  onDeleteSuccess({ id }) {
    const users = this.users.filter((user) => user._id !== id);
    this.setState({
      users
    });
  }

  onDeleteFail() {
  }

  getUsers() {
    UserSource.fetchAll();
    return {
      users: []
    };
  }

  getUserById(id) {
    const user = this.getState().users.find((user) => user._id === id);
    if (user) {
      return user;
    }
    UserSource.fetchOne(id);
    return {};
  }
}

export default alt.createStore(UserStore);
