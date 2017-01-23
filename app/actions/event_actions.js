import axios from 'axios';
import moment from 'moment';
import { browserHistory } from 'react-router'
import { addNotification } from './notification_actions';
import {getTranslations} from '../i18n/languages';


export const ADD_EVENTS = 'ADD_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const CLEAR_EVENT = 'CLEAR_EVENT';
export const LOADING = 'LOADING';

export function fetchEvents(type, order = 'type') {
  return (dispatch, getState) => {
    dispatch(loading(true, type));
    const language = getState().auth.language;
    return axios
      .get(`/api/${type}`)
      .then((response) => {
        dispatch(addEvents(response.data, type, order, language));
      })
      .catch((err) => {
        console.log("err", err);
      })
      .then(() => {
        dispatch(loading(false, type));
      });
  }
}

function addEvents(events, type, order, language) {
  return {
    type: ADD_EVENTS,
    events: orderBy(events, type, order, language),
    eventType: type
  }
}

function addEvent(event) {
  return {
    type: ADD_EVENT,
    event
  }
}

export function clearEvent() {
  return {
    type: CLEAR_EVENT
  }
}

function loading(bln, eventType) {
  return {
    type: LOADING,
    bln,
    eventType
  }
}

function orderBy(events, type, order, language) {
  switch (order) {
    case "time":
      return sortByTime(events);
    case "byYearAndMonth":
      return _.chain(sortByTime(events))
        .reduce((result, event, index) => {
          const createdAt = moment(event.createdAt);
          const year = createdAt.year();
          const month = createdAt.month();
          const monthName = createdAt.format('MMMM');

          if (!result[year]) {
            result[year] = [];
          }
          if (!result[year][month]) {
            result[year][month] = {
              key: monthName,
              values: []
            };
          }

          result[year][month].values.push(event);
          return result;
        }, {})
        .reduce((result, months, year) => {
          result[year] = {
            key: year,
            values: months
          };
          return result;
        }, [])
        .value();
    case 'byCategory':
      return _.chain(sortByTime(events))
        .reduce((result, event, index) => {

          const categories = {
            infoposts: getTranslations(language).infopostCategories,
            tasks: getTranslations(language).taskCategories
          };

          const categoryName = categories[type][event.category];

          if (!result[event.category]) {
            result[event.category] = {
              key: categoryName,
              values: []
            };
          }

          result[event.category].values.push(event);
          return result;
        }, [])
        .value();
    case "type":
      return events;
  }
}

function sortByTime(events) {
  return events.sort((a, b) => {
    let aDate, bDate;
    if (a.hasOwnProperty('createdAt')) {
      aDate = moment(a.createdAt);
      bDate = moment(b.createdAt);

      if (aDate.isAfter(bDate)) {
        return -1;
      }
      if (aDate.isBefore(bDate)) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
    else if (a.hasOwnProperty('date_create')) {
      aDate = a['date_create'];
      bDate = b['date_create'];

      if (aDate > bDate) {
        return -1;
      }
      if (aDate < bDate) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
  });
}

export function addComment(content) {
  return (dispatch) => {
    content.__t = 'comments';
    dispatch(create(content))
      .then(() => {
        dispatch(fetchEvents("events", "time"));
      });
  }
}

export function removeComment(id) {
  return (dispatch) => {
    dispatch(remove('comments', id))
      .then(() => {
        dispatch(fetchEvents("events", "time"));
      });
  }
}

export function fetchOne(type, id) {
  return (dispatch) => {
    return axios
      .get(`/api/${type}/${id}`)
      .then((response) => {
        dispatch(addEvent(response.data));
      });
  }
}

export function create(event) {
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .post(`/api/${event.__t.toLowerCase()}s`, event)
      .then((response) => {
        dispatch(addNotification(
          {
            type: "success",
            category: "create_success_msg",
            messageIds: [`events.notifications.type.${event.__t}` , "events.notifications.create.success"],
            fade: true
          }));
        dispatch(loading(false));
        browserHistory.push('/home');
      })
      .catch(() => {
        dispatch(addNotification(
          {
            type: "error",
            category: "create_error_msg",
            messageIds: [`events.notifications.type.${event.__t}` , "events.notifications.create.fail"],
            fade: true
          }));
        throw "add failed";
      });
  }
}

export function createPhotoset(photoset) {
  return (dispatch) => {
    dispatch(loading(true));

    const formData = photoset.photos;
    formData.append('title', photoset.title);

    return axios.post('/api/flickr', formData, {
      transformRequest(data) {
        return data;
      }
    }).then((response) => {
      dispatch(addNotification(
        {
          type: "success",
          category: "create_success_msg",
          content: "Creation successful!",
          fade: true
        }));
      dispatch(loading(false));
      browserHistory.push('/home');
    }).catch((error) => {
      console.log(error);
      dispatch(addNotification(
        {
          type: "error",
          category: "create_error_msg",
          content: "Creation failed!",
          fade: true
        }));
    });
  }
}

export function update(event) {
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .put(`/api/${event.__t.toLowerCase()}s/${event._id}`, event)
      .then((response) => {
        dispatch(addNotification(
          {
            type: "success",
            category: "create_success_msg",
            messageIds: [`events.notifications.type.${event.__t}` , "events.notifications.update.success"],
            fade: true
          }));
        dispatch(loading(false));
        browserHistory.push('/home');
      })
      .catch(() => {
        dispatch(addNotification(
          {
            type: "error",
            category: "create_error_msg",
            messageIds: [`events.notifications.type.${event.__t}` , "events.notifications.update.fail"],
            fade: true
          }));
      });
  }
}

export function remove(type, id) {
  return (dispatch) => {
    dispatch(loading(true));
    return axios
      .delete(`/api/${type.toLowerCase()}s/${id}`)
      .then((response) => {
        dispatch(addNotification(
          {
            type: "success",
            category: "create_success_msg",
            messageIds: [`events.notifications.type.${type}` , "events.notifications.delete.success"],
            fade: true
          }));
      })
      .catch(() => {
        dispatch(addNotification(
          {
            type: "error",
            category: "create_error_msg",
            messageIds: [`events.notifications.type.${type}` , "events.notifications.delete.fail"],
            fade: true
          }));
      })
      .then(() => {
        dispatch(loading(true));
        dispatch(fetchEvents('events', 'time'));
      });
  }
}
