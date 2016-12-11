import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { remove } from '../../actions/user_actions.js';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.remove(this.props.user._id);
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
            { this.props.auth.user.role === 'admin' ?
              <span>
                    <div className="delete color-circle" onClick={() => this.handleDelete()}>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    remove
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
