import alt from '../alt';
import EventSource from './event_source';

class EventActions {
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

  delete({ type, id }) {
    EventSource.delete(type, id);
  }

  create({ type, content }) {
    EventSource.new(type, content);
  }

  update({ type, content }) {
    EventSource.update(type, content);
  }
}

export default alt.createActions(EventActions);
