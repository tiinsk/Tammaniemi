import React from 'react';
import LoginStore from '../../login/stores/login';
import LoginActions from '../../login/actions/login';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

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

    static willTransitionTo(transition) {
      /*
      console.log("sqqqqqwqq");
      if (!LoginStore.getState().isLoggedIn) {
        console.log('redirecting');
        transition.redirect('/login');
      }*/
      
      var token = window.localStorage.jwt;
      if (typeof token === 'undefined') {
        transition.redirect('/login');
      };
    }


    render() {
      return (
      <ComposedComponent
        {...this.props}
        user={this.state.user}
        jwt={this.state.jwt}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};