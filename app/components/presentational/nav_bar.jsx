import React from 'react';
import {Link} from 'react-router';

import InviteUserModal from '../../user/components/invite_user_modal';
import UserMenu  from '../../partials/user_menu';

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
              Posts
            </Link>
          </div>
          <div className="menu-btn" >
            <Link to="/infoposts" activeClassName="active">
              Infoposts
            </Link>
          </div>
          <div className="menu-btn" >
            <Link to="/users" activeClassName="active">
              Users
            </Link>
          </div>

          <div className="menu-btn" >
            <Link to="/reservations" activeClassName="active">
              Reservations
            </Link>
          </div>
          <div className="menu-btn" >
            <Link to="/tasks" activeClassName="active">
              Tasks
            </Link>
          </div>
          <div className="menu-btn" >
            <Link to="/gallery" activeClassName="active">
              Gallery
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

export default NavBar;
