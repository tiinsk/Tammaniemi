import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeNotification } from '../../actions/notification_actions';
import translate from '../../translate.jsx';

const Notifications = ({strings, notifications, removeNotification}) => {
  let notificationItems = notifications.map((notification, index) => {
    return(
      <div className={"notification " + notification.type} key={index}>
        <span className="icon"/>
        { notification.messageIds ?
          notification.messageIds.map(id => {
           return _.get(strings, id) + " ";
          }) : _.get(strings, notification.messageId)
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(translate(Notifications));
