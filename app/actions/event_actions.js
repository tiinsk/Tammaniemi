import axios from 'axios';
import moment from 'moment';

export const ADD_EVENTS = 'ADD_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const LOADING = 'LOADING';
export const FETCH_ERROR = 'FETCH_ERROR';

export function fetchEvents(type, order) {
 return (dispatch) => {
   dispatch(fetchError(false));
   dispatch(loading(true));
   return axios
     .get(`/api/${type}`)
     .then((response) => {
       dispatch(addEvents(response.data, order));
     })
     .catch((err) => {
       console.log("err",err);
       dispatch(fetchError(true));
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

function fetchError(bln){
  return {
    type: FETCH_ERROR,
    bln
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
