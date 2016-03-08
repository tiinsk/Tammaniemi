import EventActions from './event_actions';

class EventSource {
  static fetchAll(type) {
    return $.ajax({
      url: `/api/${type}`
    }).promise().then((events) => {
      EventActions.fetchAllSuccess({
        type,
        events
      });
    });
  }

  static fetchOne(type, id) {
    return $.ajax({
      url: `/api/${type}/${id}`
    }).promise().then((event) => {
      EventActions.fetchOneSuccess({
        type,
        event
      });
    });
  }

  static new(type, event) {
    return $.ajax({
      type: 'POST',
      url: `/api/${type}`,
      data: event
    }).promise().then((created) => {
      EventActions.newSuccess({
        type,
        created
      });
    });
  }

  static update(type, updated) {
    return $.ajax({
      type: 'PUT',
      url: `/api/${type}/${updated._id}`,
      data: updated
    }).promise().then((updated) => {
      EventActions.updateSuccess({
        type,
        updated
      });
    });
  }

  static delete(type, id) {
    return $.ajax({
      type: 'DELETE',
      url: `/api/${type}/${id}`
    }).promise().then(() => {
      EventActions.deleteSuccess({
        type,
        id
      });
    });
  }

}

export default EventSource;
