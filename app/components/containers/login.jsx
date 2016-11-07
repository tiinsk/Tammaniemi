import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { loginUser } from '../../actions/login_actions';
import { addNotification, removeNotificationByCategory } from '../../actions/notification_actions';

export class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.setState({
      "randPic": this.giveRandPic()
    });
  }

  updateEmail(value) {
    this.setState({
      email: value
    });
  }

  updatePassword(value) {
    this.setState({
      password: value
    });
  }

  login() {
    this.props.loginUser(this.state.email, this.state.password)
      .then(() => {
        this.props.removeNotificationByCategory("login_error_msg");
        browserHistory.push('/home');
      })
      .catch(() => {
        this.props.addNotification(
          { type: "error",
            category: "login_error_msg",
            content: "Login failed!",
            fade: true
          });
      });
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
      "backgroundImage": `url(${require('../../../assets/whole-imgs/'+this.state.randPic)})`,
    };

    return (
      <div className="login">
        <div className="img" style={imgStyle}></div>
        <div className="overlay"></div>
        <div className="content">
          <div className="title">Tammaniemi</div>
          <input
            className="login-form-input"
            type="text"
            placeholder="Email"
            onChange={ ({target}) => this.updateEmail(target.value)}
            value={this.state.email}
            />
          <input
            className="login-form-input"
            type="password"
            placeholder="Password"
            onChange={({target}) => this.updatePassword(target.value)}
            value={this.state.password}
            />
          <button className="login-btn" type="submit" onClick={this.login.bind(this)}>Login</button>
        </div>
      </div>
    );
  }
};

function mapStateToProps({auth}) {
  return {
    auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loginUser, addNotification, removeNotificationByCategory}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
