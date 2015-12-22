import React from 'react';
import UserStore from '../stores/show';
import UserActions from '../actions/show';

class ShowUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.onChange);
    UserActions.getUser(this.props.params.userId);
  }

   componentWillUnmount() {
    UserStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    // Fetch new charachter data when URL path changes
    if (prevProps.params.userId !== this.props.params.userId) {
      UserActions.getUser(this.props.params.userId);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
          <h2><strong>{this.state.user.name}</strong></h2>
          <h4 className='lead'>{this.state.user.email}</h4>
          <h4 className='lead'>{this.state.user.password}</h4>
      </div>
    );
  }
}

export default ShowUser;