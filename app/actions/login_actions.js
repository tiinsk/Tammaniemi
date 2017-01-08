import axios from 'axios';

export const ADD_LOGGED_USER = 'ADD_LOGGED_USER';
export const REMOVE_LOGGED_USER = 'REMOVE_LOGGED_USER';
export const CHOOSE_LANGUAGE = 'CHOOSE_LANGUAGE';

export function addLoggedUser(user, error){
    return {
        type: ADD_LOGGED_USER,
        user,
        error
    }
}

export function loginUser(email, password){
    return (dispatch) => {
        return axios
        .post('/api/login', {
          email,
          password
        })
        .then( response => {
          dispatch(addLoggedUser(response.data));
        })
        .catch( err => {
            console.log("err", err);
            dispatch(removeLoggedUser());
            throw 'login failed';
        });
    }
}

export function removeLoggedUser(){
    return {
        type: REMOVE_LOGGED_USER
    }
}

export function logoutUser(){
    return (dispatch) => {
        return axios
        .get('/api/logout')
        .then((response) => {
          console.log("logout action");
          dispatch(removeLoggedUser());
        });
    }
}

export function isUserLoggedIn(){
    return (dispatch) => {
        axios
        .get('/api/account')
        .then( response => {
            dispatch(addLoggedUser(response.data));
        })
        .catch( err => {
            dispatch(removeLoggedUser());
        });
    };
}

export function chooseLanguage(language){
  return{
    type: CHOOSE_LANGUAGE,
    language
  }
}
