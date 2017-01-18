import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory, Link} from 'react-router';

import {logoutUser} from '../../actions/login_actions';
import translate from '../../translate.jsx';
import Modal from '../presentational/modal.jsx';
import InviteUser from '../containers/invite_user.jsx';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
      modalIsOpen: false
    };
  }

  toggleOpen() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  }

  toggleModalOpen(){
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  logout(){
    this.props.logoutUser().then(() => {
      browserHistory.push('/');
    })
  }

  render() {
    return (
      <div className="user-menu">
        {this.state.menuIsOpen ? <div className="overlay" onClick={() => this.toggleOpen()}></div> : null}
        <div
          className={"username-container" + " " + (this.state.menuIsOpen ? "open" : "")}
          onClick={() => this.toggleOpen()}
        >
          <div>
            <i className="fa fa-user"></i>
          </div>
          <div className="username">
            {this.props.auth.user.name}
          </div>
          <div>
            <i className="fa fa-sort-desc"></i>
          </div>
        </div>
        { this.state.menuIsOpen ?
          <div className="items-list">
            <Link to="/user/update">
              <div className="list-item">
                <i className="fa fa-cog"></i>
                {this.props.strings.settings}
              </div>
            </Link>
            <div className="list-item invite">
              <div onClick={ () => this.toggleModalOpen() }>
                <i className="fa fa-users"></i>
                {this.props.strings.inviteUserModal.inviteUser}
              </div>
              <Modal
                isOpen={this.state.modalIsOpen}
                toggleOpen={() => this.toggleModalOpen()}
              >
                <InviteUser
                  close={() => this.toggleModalOpen()}
                />
              </Modal>
            </div>
            <div className="list-item logout" onClick={() => this.logout()}>
              <i className="fa fa-sign-out"></i>
              {this.props.strings.logout}
            </div>
          </div> : null
        }
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
  return bindActionCreators({logoutUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(UserMenu));
