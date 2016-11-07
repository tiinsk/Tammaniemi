import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, REMOVE_NOTIFICATION_BY_CATEGORY, REMOVE_ALL } from '../actions/notification_actions';

const initialState = [];

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      let new_notification = action.notification;
      new_notification.id = `${new_notification.category}_${Date.now()}`;
      return [...state, new_notification];
    case REMOVE_NOTIFICATION:
      return state.filter((val) => val.id !== action.id );
    case REMOVE_NOTIFICATION_BY_CATEGORY:
      return state.filter((val) => val.category !== action.category );
    case REMOVE_ALL:
      return [];
    default:
      return state
  }
};

export default notificationReducer;
