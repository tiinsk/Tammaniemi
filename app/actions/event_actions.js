import axios from 'axios';
import moment from 'moment';

export const ADD_EVENTS = 'ADD_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const LOADING = 'LOADING';

import { addNotification } from './notification_actions';

export function fetchEvents(type, order) {
 return (dispatch) => {
   dispatch(loading(true));
   return axios
     .get(`/api/${type}`)
     .then((response) => {
       dispatch(addEvents(response.data, order));
     })
     .catch((err) => {
       console.log("err",err);
     })
     .then(() => {
       dispatch(loading(false));
     });
  }
}

function addEvents(events, order){
  return {
    type: ADD_EVENTS,
    events: orderBy(events, order)
  }
}

function loading(bln) {
  return {
    type: LOADING,
    bln
  }
}

function orderBy(events, order){
  switch (order){
    case "time":
      return events.sort((a, b) => {
        const aDate = moment(a.createdAt);
        const bDate = moment(b.createdAt);
        if (aDate.isAfter(bDate)) {
          return -1;
        }
        if (aDate.isBefore(bDate)) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
    case "type":
      return events;
  }
}

export function addComment(content){
  return(dispatch) => {
    dispatch(create('comments', content))
      .then(() => {
       dispatch(fetchEvents("events", "time"));
      });
  }
}

export function removeComment(id){
  return(dispatch) => {
    dispatch(remove('comments', id))
      .then(() => {
        dispatch(fetchEvents("events", "time"));
      });
  }
}

export function fetchOne(type, id){
  return (dispatch) => {
    return axios
      .get(`/api/${type}/${id}`)
      .then((response) => {
        EventActions.fetchOneSuccess({
          type,
          event: response.data
        });
      });
  }
}

export function create(type, event){
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .post(`/api/${type}`, event)
      .then((response) => {
        dispatch(addNotification(
          { type: "success",
            category: "create_success_msg",
            content: "Creation successful!",
            fade: true
          }));
      })
      .catch(() => {
        dispatch(addNotification(
          { type: "error",
            category: "create_error_msg",
            content: "Creation failed!",
            fade: true
          }));
      })
      .then(() => {
        dispatch(loading(true));
      });
  }
}

export function update(type, event){
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .put(`/api/${type}/${updated._id}`, event)
      .then((response) => {
        dispatch(addNotification(
          { type: "success",
            category: "create_success_msg",
            content: "Update successful!",
            fade: true
          }));
      })
      .catch(() => {
        dispatch(addNotification(
          { type: "error",
            category: "create_error_msg",
            content: "Update failed!",
            fade: true
          }));
      })
      .then(() => {
        dispatch(loading(true));
      });
  }
}

export function remove(type, id){
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .delete(`/api/${type}/${id}`)
      .then((response) => {
        dispatch(addNotification(
          { type: "success",
            category: "create_success_msg",
            content: "Delete successful!",
            fade: true
          }));
      })
      .catch(() => {
        dispatch(addNotification(
          { type: "error",
            category: "create_error_msg",
            content: "Delete failed!",
            fade: true
          }));
      })
      .then(() => {
        dispatch(loading(true));
      });
  }
}
