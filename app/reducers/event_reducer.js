import { ADD_EVENTS, ADD_EVENT, LOADING } from '../actions/event_actions';

const INITIAL_STATE = {
  events: [],
  event: undefined,
  loading: false
};

const eventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EVENTS:
      return Object.assign({}, state, {
        events: action.events
      });
    case ADD_EVENT:
      return Object.assign({}, state, {
        event: action.event
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
