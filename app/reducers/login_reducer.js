import { ADD_LOGGED_USER, REMOVE_LOGGED_USER } from '../actions/login_actions';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOGGED_USER:
        let newState = {
            user: action.user,
            isLoggedIn: true
        };
        console.log(newState);
        return newState;
    case REMOVE_LOGGED_USER:
        return {
            user: undefined,
            isLoggedIn: false
        }
    default:
      return state
  }
};

export default loginReducer;
