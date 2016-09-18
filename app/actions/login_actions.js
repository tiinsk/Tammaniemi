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
    console.log("loginUser action");
    return (dispatch) => {
        axios
        .post('/api/login', {
          email,
          password
        })
        .then( response => {
          dispatch(addLoggedUser(response.data));
        })
        .catch( err => {
            console.log("err", err);
            dispatch(removeLoggedUser(undefined, "LOGIN_ERROR"));
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
