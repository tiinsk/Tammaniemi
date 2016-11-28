import { ADD_EVENTS, ADD_EVENT, LOADING, CLEAR_EVENT } from '../actions/event_actions';

const INITIAL_STATE = {
  events: [],
  Post: [],
  Infopost: [],
  Task: [],
  Reservation: [],
  photosets: [],
  event: undefined,
  loading: false
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
        event: null
      });
    case LOADING:
      return Object.assign({}, state, {
        loading: action.bln
      });
    default:
      return state
  }
};

export default eventReducer;
