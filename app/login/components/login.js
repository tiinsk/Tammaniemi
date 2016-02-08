import React from 'react';
import LoginStore from '../stores/login';
import LoginActions from '../actions/login';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }


  static willTransitionTo(transition) {
      // This method is called before transitioning to this component. If the user is not logged in, we’ll send him or her to the Login page.
    
      /*
      if (LoginStore.getState().isLoggedIn) {
        console.log('redirecting');
        transition.redirect('/');
      }
      */
      var token = window.localStorage.jwt;
      if (typeof token !== 'undefined') {
        transition.redirect('/');
      };
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

  // This will be called when the user clicks on the login button
  login(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step
    LoginActions.loginUser(this.state.email, this.state.password);
  }

  render() {
    return (
        <form role='form'>
        <div className='form-group'>
          <input type='text' value={this.state.email} placeholder='Email' onChange={LoginActions.updateEmail}/>
          <input type='password' value={this.state.password} placeholder='Password' onChange={LoginActions.updatePassword} />
        </div>
        <button type='submit' onClick={this.login.bind(this)}>Submit</button>
      </form>
    );
  }
}

export default Login;