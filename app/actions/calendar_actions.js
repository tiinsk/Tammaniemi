import axios from 'axios';
import moment from 'moment';

export const ADD_CALENDAR_EVENTS = 'ADD_CALENDAR_EVENTS';
export const LOADING = 'LOADING';
export const FETCH_ERROR = 'FETCH_ERROR';

export function fetchCalendar() {
  return (dispatch) => {
    dispatch(fetchError(false));
    dispatch(loading(true));
    return axios
      .get(`/api/reservations`)
      .then((response) => {
        dispatch(addEvents(response.data, 'time'));
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
    type: ADD_CALENDAR_EVENTS,
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
