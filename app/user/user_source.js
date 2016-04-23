import axios from 'axios';
import UserActions from './user_actions';

class UserSource {
  static fetchAll() {
    return axios
    .get('/api/users')
    .then((response) => {
      UserActions.fetchAllSuccess({
        users: response.data
      });
    });
  }

  static fetchOne(id) {
    return axios
    .get(`/api/users/${id}`)
    .then((response) => {
      UserActions.fetchOneSuccess({
        user: response.data
      });
    });
  }

  static new(user) {
    return axios
    .post('/api/users', user)
    .then((response) => {
      UserActions.newSuccess({
        created: response.data
      });
    });
  }

  static update(updated) {
    return axios
    .put(`/api/users/${updated._id}`, updated)
    .then((response) => {
      UserActions.updateSuccess({
        updated: response.data
      });
    });
  }

  static delete(id) {
    return axios
    .delete(`/api/users/${id}`)
    .then(() => {
      UserActions.deleteSuccess({
        id
      });
    });
  }

}

export default UserSource;
