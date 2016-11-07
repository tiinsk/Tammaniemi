import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeNotification } from '../../actions/notification_actions';


const Notifications = ({notifications, removeNotification}) => {
  let notificationItems = notifications.map((notification, index) => {
    return(
      <div className={"notification " + notification.type} key={index}>
        <span className="icon"/>
        {notification.content}
        <div className="removeBtn" onClick={() => removeNotification(notification.id)}>X</div>
      </div>
    );
  });

  return(
    <div className="notifications">
      {notificationItems}
    </div>
  );
};

function mapStateToProps({notifications}) {
  return {
    notifications
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeNotification}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
