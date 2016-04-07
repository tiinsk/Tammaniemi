import React from 'react';
import Link from 'react-router';
import _ from 'lodash';

import AppBar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

import LoginStore from '../login/login_store';
import LoginActions from '../login/login_actions';

export default class MainMenu extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div>
        <AppBar className="appBar">
          <div className="mui--appbar-height content">
            <div className="logo">Tammaniemi</div>
            <div className="right-menu">
              <UserMenu />
            </div>
          </div>
        </AppBar>
        <Jumbotron/>
        <AppBar className="menuBar">
          <div className="mui--appbar-height content">
            <div className="mui-dropdown menu-item" >
              <Button className="mui-btn">
                <Link to="/home">Home</Link>
              </Button>
            </div>
            <Dropdown className="menu-item" label="Posts">
              <DropdownItem >
                <Link to="/posts/new">New</Link>
              </DropdownItem>
              <DropdownItem >
                <Link to="/posts">Index</Link>
              </DropdownItem>
            </Dropdown>
            <Dropdown className="menu-item" label="Infoposts">
               <DropdownItem >
                <Link to="/infoposts/new">New</Link>
              </DropdownItem>
              <DropdownItem >
                <Link to="/infoposts">Index</Link>
              </DropdownItem>
            </Dropdown>
            <Dropdown className="menu-item" label="Users">
               <DropdownItem >
                <Link to="/users/new">New</Link>
              </DropdownItem>
              <DropdownItem >
                <Link to="/users">Index</Link>
              </DropdownItem>
            </Dropdown>
            <Dropdown className="menu-item" label="Reservations">
               <DropdownItem >
                <Link to="/reservations/new">New</Link>
              </DropdownItem>
              <DropdownItem >
                <Link to="/reservations">Index</Link>
              </DropdownItem>
            </Dropdown>
            <Dropdown className="menu-item" label="Tasks">
               <DropdownItem >
                <Link to="/tasks/new">New</Link>
              </DropdownItem>
              <DropdownItem >
                <Link to="/tasks">Index</Link>
              </DropdownItem>
            </Dropdown>
            <div className="mui-dropdown menu-item" >
              <Button className="mui-btn">
                  <Link to="/gallery">Gallery</Link>
                </Button>
              </div>
          </div>
        </AppBar>
      </div>
    );
  }
}

class UserMenu extends React.Component{
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
    const userMenu = () => {
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
        userMenu()
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
    return pics[Math.floor(Math.random() * 9)];
    //return pics[1];
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
