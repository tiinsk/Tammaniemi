import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

import history from '../history';

import LoginStore from '../login/login_store';
import LoginActions from '../login/login_actions';


export default class MainMenu extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <MenuBar />
        <div className="jumbotron">
          <div className="img" style={{"backgroundImage": "url(/img/IMGP1145.jpg)"}}></div>
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

  goTo(place) {
    history.pushState(null, place);
  }

  toggleMenu(){
    console.log("toggleMenu");
    this.setState({
      responsive: !this.state.responsive
    })
  }

  render(){
    return(
      <ul className={"menu-bar " + (this.state.responsive ? "responsive" : "")}>
        <li className="logo" onClick={this.goTo.bind(this,"/home")}>Tammaniemi</li>
        <li className="menu-btn" onClick={this.goTo.bind(this, "/posts")}>Posts</li>
        <li className="menu-btn" onClick={this.goTo.bind(this, "/infoposts")}>Infoposts</li>
        <li className="menu-btn" onClick={this.goTo.bind(this, "/users")}>Users</li>

        <li className="menu-btn" onClick={this.goTo.bind(this, "/reservations")}>Reservations</li>
        <li className="menu-btn" onClick={this.goTo.bind(this, "/tasks")}>Tasks</li>
        <li className="menu-btn" onClick={this.goTo.bind(this, "/gallery")}>Gallery</li>
        <li className="right-menu">
          <LoginMenu />
        </li>
        <li className="icon" onClick={this.toggleMenu.bind(this)}>
          <div>&#9776;</div>
        </li>
      </ul>
    );
  }
}

class LoginMenu extends React.Component{
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  logout() {
    LoginActions.logout();
  }

  render() {

    return (
      <div >
        <span className="user-logo"> {this.state.user.name}</span>
        <span className="btn" onClick={this.logout.bind(this)} >
          Logout
        </span>
      </div>
      );
  }
}
