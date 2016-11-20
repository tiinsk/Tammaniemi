import { combineReducers } from 'redux';
import loginReducer from './login_reducer';
import notificationReducer from './notification_reducer';
import eventReducer from './event_reducer';

export default combineReducers({
  auth: loginReducer,
  notifications: notificationReducer,
  events: eventReducer
});
