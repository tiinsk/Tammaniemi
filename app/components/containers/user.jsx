import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete() {
    console.log("Not yet implemented!!");
    return true;
  }

  render() {

    return (
      <div className='user-item' >
        <div className="box">
          <div className="primary-symbol">
            <div className="img"></div>
          </div>
          <div
            className="title"
          >
            {this.props.user.name}
          </div>
          <div
            className="content"
          >
            <div className="email">{this.props.user.email}</div>
            <div className="joined-time">Joined {moment(this.props.user.createdAt).fromNow()}</div>
          </div>
          <div className="edit-menu">
            { true === true ?
              <span>
                    <div className="delete color-circle" onClick={() => {}}>
                      <div className="icon icon-trash"></div>
                    </div>
                  </span>
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    auth
  }
}

export default connect(mapStateToProps, null)(User);
