import axios from 'axios';

export const ADD_LOGGED_USER = 'ADD_LOGGED_USER';
export const REMOVE_LOGGED_USER = 'REMOVE_LOGGED_USER';

export function addLoggedUser(user, error){
    console.log("addLoggedUser");
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
            dispatch(removeLoggedUser("LOGIN_ERROR"));
          throw 'login failed';
        });
    }
}

export function removeLoggedUser(error){
    return {
        type: REMOVE_LOGGED_USER,
        error
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
    console.log('isloggedAction');
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
