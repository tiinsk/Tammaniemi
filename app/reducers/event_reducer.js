import { ADD_EVENTS, ADD_EVENT, LOADING, CLEAR_EVENT } from '../actions/event_actions';

const INITIAL_STATE = {
  events: [],
  posts: [],
  infoposts: [],
  tasks: [],
  reservations: [],
  photosets: [],
  event: {},
  loading: {
    events: false,
    reservations: false,
    posts: false,
    tasks: false,
    infoposts: false,
    photosets: false
  }
};

const eventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EVENTS:
      return Object.assign({}, state, {
        [action.eventType]: action.events
      });
    case ADD_EVENT:
      return Object.assign({}, state, {
        event: action.event
      });
    case CLEAR_EVENT:
      return Object.assign({}, state, {
        event: {}
      });
    case LOADING:
      let loading = Object.assign({}, state.loading, {
        [action.eventType]: action.bln
      });
      return Object.assign({}, state, {loading});
    default:
      return state
  }
};

export default eventReducer;
