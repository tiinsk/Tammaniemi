import _ from 'lodash';
import alt from '../alt';
import { browserHistory } from 'react-router';
import EventSource from './event_source';
import EventActions from './event_actions';

class EventStore {
  constructor() {
    this.bindActions(EventActions);
    this.posts = [];
    this.infoposts = [];
    this.tasks = [];
    this.reservations = [];
    this.photosets = [];

    this.exportPublicMethods({
      getByType: this.getByType,
      getByTypeAndId: this.getByTypeAndId
    });
  }

  onFetchAllSuccess({ type, events }) {
    this.setState({
      [type]: events
    });
  }

  onFetchAllFail() {
  }

  onFetchOneSuccess({ type, event }) {
    const index = this[type].findIndex((e) =>
      e._id === event._id || e.id === event.id
    );
    if (index !== -1) {
      this[type][index] = event;
      return;
    }
    this[type].push(event);
  }

  onFetchOneFail() {
  }

  onNewSuccess({ type, created }) {
    if (type === 'comments') {
      _.forEach([
        this.posts,
        this.infoposts,
        this.tasks,
        this.reservations,
      ], (events) => {
        const event = events.find((event) => event._id === created.eventId);
        if (event) {
          event.comments.push(created);
          return false;
        }
        return true;
      });
      return;
    }
    browserHistory.push(`/${type}/${created._id}`);
  }

  onNewFail() {
  }

  onUpdateSuccess({ type }) {
    browserHistory.push(`/${type}`);
  }

  onUpdateFail() {
  }

  onDeleteSuccess({ type, id }) {
    if (type === 'comments') {
      _.forEach([
        this.posts,
        this.infoposts,
        this.tasks,
        this.reservations,
      ], (events) => {
        _.forEach(events, (event) => {
          event.comments = event.comments.filter((comment) => {
            return comment._id !== id;
          });
        });
      });
      this.emitChange();
      return;
    }
    const events = this[type].filter((event) => event._id !== id);
    this.setState({
      [type]: events
    });
  }

  onDeleteFail() {
  }

  getByType(type) {
    EventSource.fetchAll(type);
    return [];
  }

  getByTypeAndId(type, id, forceFetch) {
    if (forceFetch) {
      EventSource.fetchOne(type, id);
      return {};
    }

    const event = this.getState()[type].find((event) => event._id === id || event.id === id);
    if (event) {
      return event;
    }
    EventSource.fetchOne(type, id);
    return {};
  }


}


export default alt.createStore(EventStore);
