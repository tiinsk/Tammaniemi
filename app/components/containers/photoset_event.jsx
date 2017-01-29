import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { Link } from 'react-router';
import moment from 'moment';


class PhotosetEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`event photoset`} >
        <div className="box">
          <div className="primary-symbol">
            <div className="img"></div>
          </div>
          <Link className="title"
                to={'/'}>
            {this.props.photoset.title}
          </Link>
          <div className="content" style={{backgroundImage: `url(${this.props.photoset.primaryPhotoUrl})`}}>
          </div>
          <div className="info">
            <div className="details">
              <div className="detail user">{this.props.photoset.userId.name}</div>
              <div className="detail created-at" >
                {moment(this.props.photoset.createdAt).fromNow()}
              </div>
            </div>
            <div className="edit-menu">
              {(this.props.auth.user._id === this.props.photoset.userId._id) || this.props.auth.user.role === 'admin' ?
                <div className="edit color-circle" onClick={() => this.handleUpdate(this.props.photoset)}>
                  <div className="icon icon-pencil"></div>
                </div> : null
              }
              {(this.props.auth.user._id === this.props.photoset.userId._id) || this.props.auth.user.role === 'admin' ?
                <div className="delete color-circle" onClick={() => this.handleDelete(this.props.photoset)}>
                  <div className="icon icon-trash"></div>
                </div>
                : null
              }
            </div>
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
  return bindActionCreators({  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotosetEvent));
