import { ADD_LOGGED_USER, REMOVE_LOGGED_USER } from '../actions/login_actions';

let userResolve;
let userReject;

const initialState = {
    userPromise: new Promise((resolve, reject) => {
        userResolve = resolve;
        userReject = reject;
    })
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOGGED_USER:
        userResolve(action.user);

        let newState = {
            user: action.user,
            isLoggedIn: true,
            userPromise: Promise.resolve(action.user)
        };

        return newState;
    case REMOVE_LOGGED_USER:
        userReject('Not logged in');
        return {
            user: {},
            isLoggedIn: false,
            userPromise: Promise.reject('Not logged in')
        };
    default:
      return state
  }
};

export default loginReducer;
