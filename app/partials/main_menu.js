import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

import AppBar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

import history from '../history';

import LoginStore from '../login/login_store';
import LoginActions from '../login/login_actions';


export default class MainMenu extends React.Component{
  constructor(props){
    super(props);
  }

  goTo(place) {
    history.pushState(null, place);
  }

  render(){
    return(
      <div>
        <AppBar className="appBar">
          <div className="mui--appbar-height content">
            <div className="logo">Tammaniemi</div>
              <div className="center-menu">
                <div className="menu-btn home" onClick={this.goTo.bind(this,"/home")}>Home</div>
                <div className="menu-btn posts" onClick={this.goTo.bind(this, "/posts")}>Posts</div>
                <div className="menu-btn infoposts" onClick={this.goTo.bind(this, "/infoposts")}>Infoposts</div>
                <div className="menu-btn users" onClick={this.goTo.bind(this, "/users")}>Users</div>

                <div className="menu-btn reservations" onClick={this.goTo.bind(this, "/reservations")}>Reservations</div>
                <div className="menu-btn tasks" onClick={this.goTo.bind(this, "/tasks")}>Tasks</div>
                <div className="menu-btn gallery" onClick={this.goTo.bind(this, "/gallery")}>Gallery</div>
              </div>

            <div className="right-menu">
              <LoginMenu />
            </div>
          </div>
        </AppBar>
        <Jumbotron/>
      </div>
    );
  }
}

class LoginMenu extends React.Component{
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
    console.log(this.state);
    console.log(this.state.isLoggedIn);
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
    const loginMenu = () => {
      if (_.isEmpty(this.state.user)) {
        return (
          <Link className="btn" to="/login">Login</Link>
        );
      }

      return (
        <div>
          <span className="user-logo"> Hi {this.state.user.name}, welcome back! </span>
          <span className="btn" onClick={this.logout.bind(this)} >
            Logout
          </span>
        </div>
      );
    };

    return (
        loginMenu()
      );
  }
}

class Jumbotron extends React.Component{
  constructor(){
    super();
    this.state = {
      "randPic": this.giveRandPic()
    }
  }

  componentWillMount(){
    this.setState({
      "randPic": this.giveRandPic()
    });
    console.log(this.state.randPic);
  }

  giveRandPic(){
    var pics = [
      "IMGP1145.jpg",
      "IMGP1147.jpg",
      "IMGP1158.jpg",
      "IMGP1166.jpg",
      "IMGP1169.jpg",
      "IMGP1232.jpg",
      "IMGP1245.jpg",
      "IMGP1273.jpg",
      "IMGP1410.jpg"
      ];
    //return pics[Math.floor(Math.random() * 9)];
    return pics[0];
  }

  render(){
    var imgStyle = {
      "backgroundImage": `url(/img/${this.state.randPic})`,
    }
    return(
      <div className="jumbotron">
        <div className="img" style={imgStyle}></div>
        <div className="overlay"></div>
      </div>
      );
  }
}

