import merge from 'lodash/merge'
import { ADD_EVENTS, ADD_EVENT, LOADING, CLEAR_EVENT, COMMENT_CREATED} from '../actions/event_actions';

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

const setCommentToEventWithId = (event, id, comment) => {
  if(event._id && event._id === id) {
    event.comments.push(comment);
    return event;
  }

  for (let prop in event) {
    if(event.hasOwnProperty(prop) && typeof event[prop] === 'object') {
      const candidate = setCommentToEventWithId(event[prop], id, comment);
      if (candidate !== null) {
        return candidate;
      }
    }
  }

  return null;
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
    case COMMENT_CREATED:
      const {eventId} = action.comment;
      const eventType = `${eventId.__t.toLowerCase()}s`;
      setCommentToEventWithId(state[eventType], eventId._id, action.comment);
      return merge({}, state);
    default:
      return state
  }
};

export default eventReducer;
