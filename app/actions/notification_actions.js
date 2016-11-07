export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const REMOVE_NOTIFICATION_BY_CATEGORY = 'REMOVE_NOTIFICATION_BY_CATEGORY';
export const REMOVE_ALL = 'REMOVE_ALL';

const FADE_OUT_TIME = 5000;

export function addNotification(notification){
  return (dispatch) => {
    if (notification.fade) {
      setTimeout(()=> {
        dispatch(removeNotification(notification.id));
      }, FADE_OUT_TIME);
    }

    dispatch({
      type: ADD_NOTIFICATION,
      notification
    });
  }
}

export function removeNotification(id){
  return {
    type: REMOVE_NOTIFICATION,
    id
  }
}

export function removeNotificationByCategory(category){
  return {
    type: REMOVE_NOTIFICATION_BY_CATEGORY,
    category
  }
}

export function removeAllNotifications(){
  return {
    type: REMOVE_ALL
  };
}
