import moment from 'moment';
import { ADD_LOGGED_USER, REMOVE_LOGGED_USER, CHOOSE_LANGUAGE } from '../actions/login_actions';

let userResolve;
let userReject;

const locale = localStorage.getItem("language") || "fi";
moment.locale(locale);

const initialState = {
    userPromise: new Promise((resolve, reject) => {
        userResolve = resolve;
        userReject = reject;
    }),
    language: locale
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOGGED_USER:
        userResolve(action.user);

        let newState = {
            user: action.user,
            isLoggedIn: true,
            userPromise: Promise.resolve(action.user),
            language: state.language
        };

        return newState;
    case REMOVE_LOGGED_USER:
        userReject('Not logged in');
        return {
            user: {},
            isLoggedIn: false,
            userPromise: Promise.reject('Not logged in'),
            language: state.language
        };
    case CHOOSE_LANGUAGE:
      localStorage.setItem("language", action.language);
      moment.locale(action.language);

      return Object.assign({}, state, {
        language: action.language
      });
    default:
      return state
  }
};

export default loginReducer;
