import React from 'react';
import LoginStore from './login_store';
import LoginActions from './login_actions';
import NewUserModal from '../user/new_user_modal';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    this.setState({
      "randPic": this.giveRandPic()
    });
    console.log(this.state.randPic);
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

  updateEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  login(e) {
    e.preventDefault();
    LoginActions.loginUser(this.state.email, this.state.password);
  }

  giveRandPic(){
    var pics = [
      "IMGP1145.jpg",
      //"IMGP1147.jpg",
      "IMGP1158.jpg",
      "IMGP1166.jpg",
      "IMGP1167.jpg",
      "IMGP1245.jpg",
      "IMGP1273.jpg",
      //"IMGP1388.jpg",
      "IMGP1410.jpg"
      ];
    return pics[Math.floor(Math.random() * 7)];
    //return pics[1];
  }

  render() {
    var imgStyle = {
      "backgroundImage": `url(/img/whole-imgs/${this.state.randPic})`,
    }
    return (
      <div className="login">
        <div className="img" style={imgStyle}></div>
        <div className="overlay"></div>
        <NewUserModal />
        <div className="content">
          <div className="title">Tammaniemi</div>
          <form role="form">
            <input className="login-form-input" type="text" placeholder="Email" onChange={this.updateEmail.bind(this)}
                value={this.state.email}
              />
            <input className="login-form-input" type="password" placeholder="Password" onChange={this.updatePassword.bind(this)}
                value={this.state.password}
              />
            <button className="login-btn" type="submit" onClick={this.login.bind(this)}>Login</button>
          </form>
        </div>
      </div>
    );
  }
};

