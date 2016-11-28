import { ADD_USERS, LOADING } from '../actions/user_actions';

const INITIAL_STATE = {
  users: [],
  loading: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USERS:
      return Object.assign({}, state, {
        users: action.users
      });
    case LOADING:
      return Object.assign({}, state, {
        loading: action.bln
      });
    default:
      return state
  }
};

export default userReducer;
