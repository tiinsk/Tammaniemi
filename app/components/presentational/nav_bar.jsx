import React from 'react';
import {Link} from 'react-router';

import InviteUserModal from '../containers/invite_user_modal.jsx';
import UserMenu  from '../containers/user_menu.jsx';
import translate from '../../translate.jsx';

class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      responsive: false
    }
  }

  toggleMenu(){
    this.setState({
      responsive: !this.state.responsive
    })
  }

  render() {
    return (
      <div className={`nav-bar ${(this.state.responsive ? 'responsive' : '')}`}>
        <div className="logo" >
          <Link to="/home" activeClassName="active">
            Tammaniemi
          </Link>
        </div>
        <div className="links">
          <div className="menu-btn" >
            <Link to="/posts" activeClassName="active">
              {this.props.strings.titles.posts}
            </Link>
          </div>
          <div className="menu-btn" >
            <Link to="/infoposts" activeClassName="active">
              {this.props.strings.titles.infoposts}
            </Link>
          </div>
          <div className="menu-btn" >
            <Link to="/users" activeClassName="active">
              {this.props.strings.titles.users}
            </Link>
          </div>

          <div className="menu-btn" >
            <Link to="/reservations" activeClassName="active">
              {this.props.strings.titles.reservations}
            </Link>
          </div>
          <div className="menu-btn" >
            <Link to="/tasks" activeClassName="active">
              {this.props.strings.titles.tasks}
            </Link>
          </div>
          <div className="menu-btn" >
            <Link to="/gallery" activeClassName="active">
              {this.props.strings.titles.gallery}
            </Link>
          </div>
        </div>
        <div className="right-menu">
          <InviteUserModal />
          <UserMenu />
        </div>
        <div className="icon" onClick={this.toggleMenu.bind(this)}>
          <div>&#9776;</div>
        </div>
      </div>
    );
  }
}

export default translate(NavBar);
