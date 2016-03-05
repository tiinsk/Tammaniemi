import alt from '../alt';
import LoginActions from './login_actions';

class LoginStore {

  constructor() {
    // First we register to the Dispatcher to listen for actions.
    this.bindActions(LoginActions);

    this.user = {};
    this.errorMessage = '';
    this.isLoggedIn = false;

    $.ajax({
      type: 'GET',
      url: '/api/account',
    })
    .done((data) => {
      this.setState({
        user: data,
        isLoggedIn: true
      });
    });
  }

  onLoginUserSuccess(user) {
    this.setState({
      user,
      isLoggedIn: true
    });
  }

  onLoginUserFail(errorMessage) {
    this.setState({
      errorMessage
    });
  }

  onLogoutUserSuccess() {
    this.setState({
      user: {},
      isLoggedIn: false
    });
  }

  onLogoutUserFail(errorMessage) {
    this.setState({
      errorMessage
    });
  }
}

export default alt.createStore(LoginStore);