import axios from 'axios';
import EventActions from './event_actions';

class EventSource {
  static fetchAll(type) {
    return axios
    .get(`/api/${type}`)
    .then((response) => {
      EventActions.fetchAllSuccess({
        type,
        events: response.data
      });
    });
  }

  static fetchOne(type, id) {
    return axios
    .get(`/api/${type}/${id}`)
    .then((response) => {
      EventActions.fetchOneSuccess({
        type,
        event: response.data
      });
    });
  }

  static new(type, event) {
    return axios
    .post(`/api/${type}`, event)
    .then((response) => {
      EventActions.newSuccess({
        type,
        created: response.data
      });
    });
  }

  static update(type, updated) {
    return axios
    .put(`/api/${type}/${updated._id}`, updated)
    .then((response) => {
      EventActions.updateSuccess({
        type,
        updated: response.data
      });
    });
  }

  static delete(type, id) {
    return axios
    .delete(`/api/${type}/${id}`)
    .then(() => {
      EventActions.deleteSuccess({
        type,
        id
      });
    });
  }

}

export default EventSource;
