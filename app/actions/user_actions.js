import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

export const ADD_USERS = 'ADD_USERS';
export const LOADING = 'LOADING';

import {addNotification} from './notification_actions';

export function fetchUsers() {
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .get('/api/users')
      .then((response) => {
        dispatch(addUsers(sortByUserName(response.data)));
      })
      .catch((err) => {
        console.log("err", err);
      })
      .then(() => {
        dispatch(loading(false));
      });
  }
}

function sortByUserName(users) {
  return _.sortBy(users, user => user.name);
}

function addUsers(users) {
  return {
    type: ADD_USERS,
    users
  }
}

function loading(bln) {
  return {
    type: LOADING,
    bln
  }
}


export function create(user) {
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .post('/api/users', user)
      .then((response) => {
        dispatch(addNotification(
          {
            type: "success",
            category: "create_success_msg",
            content: "User creation successful!",
            fade: true
          }));
      })
      .catch(() => {
        dispatch(addNotification(
          {
            type: "error",
            category: "create_error_msg",
            content: "User creation failed!",
            fade: true
          }));
      })
      .then(() => {
        dispatch(loading(true));
      });
  }
}

export function update(user) {
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .put(`/api/users/${user._id}`, user)
      .then((response) => {
        dispatch(addNotification(
          {
            type: "success",
            category: "update_success_msg",
            content: "User update successful!",
            fade: true
          }));
      })
      .catch(() => {
        dispatch(addNotification(
          {
            type: "error",
            category: "update_error_msg",
            content: "User update failed!",
            fade: true
          }));
      })
      .then(() => {
        dispatch(loading(true));
      });
  }
}

export function remove(id) {
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .delete(`/api/users/${id}`)
      .then((response) => {
        dispatch(addNotification(
          {
            type: "success",
            category: "delete_success_msg",
            content: "User delete successful!",
            fade: true
          }));
      })
      .catch(() => {
        dispatch(addNotification(
          {
            type: "error",
            category: "delete_error_msg",
            content: "User delete failed!",
            fade: true
          }));
      })
      .then(() => {
        dispatch(loading(true));
      });
  }
}


