import React from 'react';
import {Link} from 'react-router';

import UserMenu  from '../containers/user_menu.jsx';
import translate from '../../translate.jsx';

class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleMenu(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className={`nav-bar ${(this.state.isOpen ? 'open' : '')}`}>
        <div className="logo" >
          <Link to="/home" activeClassName="active">
            Tammaniemi
          </Link>
        </div>
        <div className="links">
          <div className="menu-btn" onClick={() => this.toggleMenu()} >
            <Link to="/posts" activeClassName="active">
              {this.props.strings.titles.posts}
            </Link>
          </div>
          <div className="menu-btn" onClick={() => this.toggleMenu()} >
            <Link to="/infoposts" activeClassName="active">
              {this.props.strings.titles.infoposts}
            </Link>
          </div>
          <div className="menu-btn" onClick={() => this.toggleMenu()} >
            <Link to="/users" activeClassName="active">
              {this.props.strings.titles.users}
            </Link>
          </div>

          <div className="menu-btn" onClick={() => this.toggleMenu()} >
            <Link to="/reservations" activeClassName="active">
              {this.props.strings.titles.reservations}
            </Link>
          </div>
          <div className="menu-btn" onClick={() => this.toggleMenu()} >
            <Link to="/tasks" activeClassName="active">
              {this.props.strings.titles.tasks}
            </Link>
          </div>
          <div className="menu-btn" onClick={() => this.toggleMenu()} >
            <Link to="/gallery" activeClassName="active">
              {this.props.strings.titles.gallery}
            </Link>
          </div>
        </div>
        <div className="right-menu">
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
