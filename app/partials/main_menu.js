import React from 'react';
import {Link} from 'react-router';

import InviteUserModal from '../user/components/invite_user_modal';

import UserMenu  from './user_menu';

export default class MainMenu extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <MenuBar />
        <div className="jumbotron">
          <div className="img" ></div>
          <div className="overlay"></div>
        </div>
      </div>
    );
  }
}

class MenuBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      responsive: false
    }
  }

  toggleMenu(){
    console.log("toggleMenu");
    this.setState({
      responsive: !this.state.responsive
    })
  }

  render() {
    return (
      <ul className={`menu-bar ${(this.state.responsive ? 'responsive' : '')}`}>
        <li className="logo" >
          <Link to="/home" activeClassName="active">
            Tammaniemi
          </Link>
        </li>
        <li className="menu-btn" >
          <Link to="/posts" activeClassName="active">
            Posts
          </Link>
        </li>
        <li className="menu-btn" >
          <Link to="/infoposts" activeClassName="active">
            Infoposts
          </Link>
        </li>
        <li className="menu-btn" >
          <Link to="/users" activeClassName="active">
            Users
          </Link>
        </li>

        <li className="menu-btn" >
          <Link to="/reservations" activeClassName="active">
            Reservations
          </Link>
        </li>
        <li className="menu-btn" >
          <Link to="/tasks" activeClassName="active">
            Tasks
          </Link>
        </li>
        <li className="menu-btn" >
          <Link to="/gallery" activeClassName="active">
            Gallery
          </Link>
        </li>
        <li className="right-menu">
          <InviteUserModal />
        </li>
        <li className="right-menu">
          <UserMenu />
        </li>
        <li className="icon" onClick={this.toggleMenu.bind(this)}>
          <div>&#9776;</div>
        </li>
      </ul>
    );
  }
}



