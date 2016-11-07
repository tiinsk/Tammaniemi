import { ADD_CALENDAR_EVENTS, LOADING, FETCH_ERROR } from '../actions/calendar_actions';

const INITIAL_STATE = {
  events: [],
};

const calendarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CALENDAR_EVENTS:
      return Object.assign({}, state, {
        events: action.events
      });
    case LOADING:
      return Object.assign({}, state, {
        loading: action.bln
      });
    case FETCH_ERROR:
      return Object.assign({}, state, {
        fetchError: action.bln
      });
    default:
      return state
  }
};

export default calendarReducer;
