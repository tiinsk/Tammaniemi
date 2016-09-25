import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { loginUser } from '../../actions/login_actions';
import NewUserModal from '../../user/components/invite_user_modal';

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
      .then(() => browserHistory.push('/home'));
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
        <NewUserModal />
        <div className="content">
          <div className="title">Tammaniemi</div>
          <div>{this.props.auth.error}</div>
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
  return bindActionCreators({loginUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
