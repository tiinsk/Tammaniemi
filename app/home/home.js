import React from 'react';

import Authenticated from '../authentication/components/authenticated';

class Home extends React.Component {
  render() {
    return (
      <div >
      	<h1>Hello {this.props.user.name}</h1>
        Hello from Home Component
      </div>
    );
  }
}

export default Authenticated(Home);